import React from "react";
import ContactForm from './ContactForm';
import Project from "./Project"; // Make sure this matches your component file
import './App.css';
import MarketingDashboard from "./MarketingDashboard";
import FeedbackSection from './FeedbackSection';
function App() {
  return (
    <div className="App">
      <h1>AI Event Management System</h1>
      <ContactForm />
      <Project />
      <MarketingDashboard />
      <FeedbackSection />

    </div>
  );
}

export default App;

