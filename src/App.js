import React, { useState, useEffect } from "react";
import ContactForm from './ContactForm';
import Project from "./Project";
import Chatbot from './Chatbot';
import MarketingDashboard from "./MarketingDashboard";
import FeedbackSection from './FeedbackSection';
//import Chatbot from './Chatbot';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isAuthenticated");
    if (loginStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
  <>
    <h1>AI Event Management System</h1>
    <Project />
    <Chatbot />
    <MarketingDashboard />
    <FeedbackSection />
   

    {/* 👇 Logout button at the bottom */}
    <div style={{ textAlign: 'center', margin: '40px 0' }}>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          background: '#f8f9fa',
          border: '1px solid #ccc',
          borderRadius: '8px',
          cursor: 'pointer',
          color: '#333',
          fontSize: '16px',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = '#e9ecef'}
        onMouseLeave={(e) => e.target.style.background = '#f8f9fa'}
      >
        Logout
      </button>
    </div>
  </>
) : (
  <>
    <h1>Welcome to AI Event Management</h1>
    <ContactForm onLogin={handleLogin} />
  </>
)}

    </div>
  );
}

export default App;
