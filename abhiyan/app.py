from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import boto3
from io import BytesIO
from langchain.docstore.document import Document
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_community.llms import Bedrock
from langchain_aws import BedrockEmbeddings

import pdfplumber  # PyMuPDF

# Initialize FastAPI
app = FastAPI()

# Allow CORS for local React development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Replace with your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AWS Bedrock and S3 Setup
bedrock = boto3.client(service_name="bedrock-runtime")
bedrock_embeddings = BedrockEmbeddings(model_id="amazon.titan-embed-text-v1", client=bedrock)
s3 = boto3.client("s3")
BUCKET_NAME = "abhiyan-files"
S3_FOLDER = "Dataset"

# Pydantic models
class QueryRequest(BaseModel):
    query: str

# Helper Functions (reuse from your original code)

# API Endpoints
@app.get("/update-vectors")
async def update_vectors():
    try:
        docs = data_ingestion()
        get_vector_store(docs)
        return JSONResponse(content={"message": "Vector store updated successfully!"}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: QueryRequest):
    try:
        vectorstore = load_faiss_index()
        llm = get_mistral_llm()
        response = get_response_llm(llm, vectorstore, request.query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Helper Functions
def fetch_files_from_s3():
    """Fetch PDF files from S3 bucket and return them as a list of BytesIO objects."""
    pdf_files = []
    objects = s3.list_objects_v2(Bucket=BUCKET_NAME, Prefix=S3_FOLDER)
    for obj in objects.get("Contents", []):
        key = obj["Key"]
        if key.endswith(".pdf"):
            response = s3.get_object(Bucket=BUCKET_NAME, Key=key)
            pdf_files.append(BytesIO(response["Body"].read()))
    return pdf_files

def process_pdf_bytes(pdf_bytes):
    """Convert a PDF (in bytes) to LangChain-compatible Document objects using pdfplumber."""
    documents = []
    # Open the PDF using pdfplumber
    with pdfplumber.open(BytesIO(pdf_bytes)) as pdf:
        for page_num, page in enumerate(pdf.pages, start=1):
            text = page.extract_text()  # Extract text from the page
            if text:  # Avoid appending empty pages
                documents.append(Document(page_content=text, metadata={"page": page_num}))
    return documents

def data_ingestion():
    pdf_files = fetch_files_from_s3()
    documents = []
    for pdf_bytes in pdf_files:
        documents.extend(process_pdf_bytes(pdf_bytes.getvalue()))
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    return text_splitter.split_documents(documents)

def get_vector_store(docs):
    vectorstore_faiss = FAISS.from_documents(docs, bedrock_embeddings)
    vectorstore_faiss.save_local("faiss_index")

def load_faiss_index():
    return FAISS.load_local("faiss_index", bedrock_embeddings, allow_dangerous_deserialization=True)

def get_mistral_llm():
    return Bedrock(model_id="mistral.mistral-7b-instruct-v0:2", client=bedrock, model_kwargs={'max_tokens': 200})

prompt_template = """
Human: Use the following pieces of context to provide a 
concise answer to the question at the end. Provide detailed explanations with at least 250 words.
If you don't know the answer, just say you don't know; don't make up an answer.
<context>
{context}
</context>

Question: {question}

Assistant:"""

PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

def get_response_llm(llm, vectorstore, query):
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3}),
        return_source_documents=True,
        chain_type_kwargs={"prompt": PROMPT}
    )
    answer = qa({"query": query})
    return answer['result']

#Sreamlit interface
# def main():
#     st.set_page_config(page_title="Abhiyan Chatbot", page_icon="💬", layout="wide")
#     st.title("Abhiyan Chatbot 💬")
    
#     # Sidebar for Vector Store Operations
#     with st.sidebar:
#         st.header("Data Management")
#         if st.button("Update Vectors"):
#             with st.spinner("Updating vectors..."):
#                 docs = data_ingestion()
#                 get_vector_store(docs)
#                 st.success("Vector store updated!")

#     # Chatbot Interface
#     st.write("Chat with the Abhiyan system about the uploaded PDF data!")
    
#     # Initialize session state for chat history
#     if "messages" not in st.session_state:
#         st.session_state.messages = [{"role": "assistant", "content": "Hello! How can I assist you today?"}]

#     # Display chat history
#     for message in st.session_state.messages:
#         if message["role"] == "assistant":
#             st.markdown(f"**💬 Assistant:** {message['content']}")
#         else:
#             st.markdown(f"**🧑 You:** {message['content']}")

#     # User input for chat
#     user_input = st.text_input("Type your query here...", key="user_input")
#     if user_input:
#         # Append user input to chat history
#         st.session_state.messages.append({"role": "user", "content": user_input})

#         # Process the query with FAISS and LLM
#         try:
#             vectorstore = load_faiss_index()
#             llm = get_mistral_llm()
#             response = get_response_llm(llm, vectorstore, user_input)
#             # Append response to chat history
#             st.session_state.messages.append({"role": "assistant", "content": response})
#         except Exception as e:
#             st.error(f"Error generating response: {e}")

# if __name__ == "__main__":
#     main()
