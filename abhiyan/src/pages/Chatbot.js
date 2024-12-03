import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! How can I assist you today?' },
    ]);
    const [input, setInput] = useState('');

    const updateVectors = async () => {
        try {
            // Perform the API call without passing a React event object
            const response = await axios.post('http://localhost:5000/update-vectors');
            console.log('Success:', response.data.message);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    };
    
    
    const sendMessage = async () => {
        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);

        try {
            const response = await axios.post('http://localhost:5000/query', { query: input });
            const assistantMessage = {
                role: 'assistant',
                content: response.data.response,
            };
            setMessages([...newMessages, assistantMessage]);
        } catch (err) {
            console.error(err);
            const errorMessage = {
                role: 'assistant',
                content: 'There was an error processing your request.',
            };
            setMessages([...newMessages, errorMessage]);
        }

        setInput('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Abhiyan Chatbot 💬</h1>
            <div style={{ height: '60vh', overflowY: 'auto', marginBottom: '20px' }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{ margin: '10px 0' }}>
                        <b>{msg.role === 'user' ? '🧑 You:' : '💬 Assistant:'}</b> {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your query..."
                style={{ width: '80%', marginRight: '10px' }}
            />
            <button onClick={sendMessage}>Send</button>
            <button onClick={updateVectors}>Update Vectors</button>;
        </div>
    )
}

export default Chat;


