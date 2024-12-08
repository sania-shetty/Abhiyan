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
    <div className="interface">
    <div style={{ padding: '50px', width: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: 'whitesmoke' }}>
    <h1 style={{ textAlign: 'center', color:"black" }}>Abhiyan Chatbot</h1>
  
    <div style={{ height: '50vh', overflowY: 'auto', marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: 'white' }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: msg.role === 'assistant' ? 'row' : 'row-reverse',
            alignItems: 'center',
            margin: '10px 0',
          }}
        >
          <img
            src={msg.role === 'assistant' ? '/images/bot.jpg' : '/images/avatar.jpg'}
            alt={msg.role}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              margin: msg.role === 'assistant' ? '0 10px 0 0' : '0 0 0 10px',
            }}
          />
          <div
            style={{
              maxWidth: '70%',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: msg.role === 'assistant' ? 'rgb(72, 133, 161)' : 'rgb(91, 210, 172)',
              textAlign: 'left',
            }}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      placeholder="Type your query here..."
      style={{
        width: 'calc(100% - 20px)',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd'
      }}
    /><br/>
    <button
      onClick={handleSendMessage}
      disabled={loading}
      style={{
        width: 'calc(50% - 5px)',
        padding: '10px',
        backgroundColor: '#2196f3',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {loading ? 'Sending...' : 'Send'}
    </button><br/>
    <button
      onClick={handleUpdateVectors}
      disabled={loading}
      style={{
        width: 'calc(50% - 5px)',
        padding: '10px',
        backgroundColor: '#4caf50',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {loading ? 'Updating...' : 'Update Vectors'}
    </button>
  </div>
  </div>
  );
};

export default AbhiyanChatbot;
