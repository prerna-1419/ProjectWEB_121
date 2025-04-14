import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const handleSend = () => {
    if (!chatInput.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: chatInput };
    const botMessage = { id: Date.now() + 1, type: 'bot', text: getBotResponse(chatInput) };

    setChatMessages((prev) => [...prev, userMessage, botMessage]);
    setChatInput('');
  };

  const getBotResponse = (input) => {
    const msg = input.toLowerCase();

    if (msg.includes('hello') || msg.includes('hi')) {
      return "Hello! 👋 How can I assist you with your event today?";
    }
    if (msg.includes('event')) {
      return "Sure! I can help you create, view, or manage your events. What would you like to do?";
    }
    if (msg.includes('venue')) {
      return "Looking for venues? Just head to the Venue Suggestion section and describe your needs!";
    }
    if (msg.includes('contact')) {
      return "To reach out to us, just fill the Contact/Registration form above!";
    }
    if (msg.includes('price') || msg.includes('budget')) {
      return "We support events on a wide range of budgets. Please specify your budget for better suggestions!";
    }
    return "Hmm... I’m still learning! Try asking about events, venues, or how to contact us.";
  };

  const handleDelete = (id) => {
    setChatMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <motion.div className="chatbot-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>🤖 Event Assistant Chatbot</h2>

      <div className="chat-box" style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                background: msg.type === 'user' ? '#d1e7ff' : '#e2e3e5',
                padding: '10px',
                borderRadius: '10px',
                maxWidth: '75%',
                position: 'relative',
              }}
            >
              {msg.text}
            </div>
            <button
              onClick={() => handleDelete(msg.id)}
              style={{
                marginLeft: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
              title="Delete message"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={chatInput}
        placeholder="Ask me anything..."
        onChange={(e) => setChatInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        style={{ padding: '10px', width: '75%', borderRadius: '10px' }}
      />
      <button onClick={handleSend} style={{ padding: '10px', marginLeft: '10px' }}>
        Send
      </button>
    </motion.div>
  );
};

export default Chatbot;
