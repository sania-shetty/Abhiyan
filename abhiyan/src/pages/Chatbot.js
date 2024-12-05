// import React, { useState } from 'react';
// import axios from 'axios';
// 

// function Chat() {
//     const [messages, setMessages] = useState([
//         { role: 'assistant', content: 'Hello! How can I assist you today?' },
//     ]);
//     const [input, setInput] = useState('');
   

//     const updateVectors = async () => {
//         try {
//             // Perform the API call without passing a React event object
//             const response = await axios.post('http://localhost:9200/update-vectors');
//             console.log('Success:', response.data.message);
//         } catch (error) {
//             console.error('Error:', error.response?.data || error.message);
//         }
//     };
    
    
//     const sendMessage = async () => {
//         const newMessages = [...messages, { role: 'user', content: input }];
//         setMessages(newMessages);

//         try {
//             const response = await axios.post('http://localhost:9200/query', { query: input });
//             const assistantMessage = {
//                 role: 'assistant',
//                 content: response.data.response,
//             };
//             setMessages([...newMessages, assistantMessage]);
//         } catch (err) {
//             console.error(err);
//             const errorMessage = {
//                 role: 'assistant',
//                 content: 'There was an error processing your request.',
//             };
//             setMessages([...newMessages, errorMessage]);
//         }

//         setInput('');
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Abhiyan Chatbot 💬</h1>
//             <div style={{ height: '60vh', overflowY: 'auto', marginBottom: '20px' }}>
//                 {messages.map((msg, idx) => (
//                     <div key={idx} style={{ margin: '10px 0' }}>
//                         <b>{msg.role === 'user' ? '🧑 You:' : '💬 Assistant:'}</b> {msg.content}
//                     </div>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your query..."
//                 style={{ width: '80%', marginRight: '10px' }}
//             /><br/>
//             <button onClick={sendMessage}>Send</button><br/>
//             <button onClick={updateVectors}>Update Vectors</button>;
//         </div>
//     )
// }

// export default Chat;

import "../css/Chatbot.css";
import React, { useState } from 'react';
import { updateVectors, getChatResponse } from '../services/api';

const AbhiyanChatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateVectors = async () => {
    try {
      setLoading(true);
      await updateVectors();
      alert('Vector store updated successfully!');
    } catch (error) {
      alert(`Error updating vectors: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);

    try {
      setLoading(true);
      const response = await getChatResponse(userInput);
      setMessages([...newMessages, { role: 'assistant', content: response }]);
    } catch (error) {
      alert(`Error fetching response: ${error}`);
    } finally {
      setUserInput('');
      setLoading(false);
    }
  };

  return (
    <div className="interface" style={{ padding: '50px' }}>
      <h1>Abhiyan Chatbot</h1>

      <div style={{ height: '50vh', overflowY: 'auto', marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <div style={{ margin: '10px 0' }} key={index} className={msg.role === 'assistant' ? 'assistant' : 'user'}>
            <strong>{msg.role === 'assistant' ? 'Assistant:' : 'You:'}</strong> {msg.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your query here..."
        style={{ width: '80%', marginRight: '10px' }}
      /><br/>
      <button onClick={handleSendMessage} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button><br/>
      <button onClick={handleUpdateVectors} disabled={loading}>
        {loading ? 'Updating...' : 'Update Vectors'}
      </button>
    </div>
  );
};

export default AbhiyanChatbot;
