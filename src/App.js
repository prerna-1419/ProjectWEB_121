import React from "react";
import Project from "./Project"; // Make sure this matches your component file
import './App.css';
import MarketingDashboard from "./MarketingDashboard";
import EventMonitoring from "./EventMonitoring";
import EventPlanner from "./EventPlanner";
function App() {
  return (
    <div className="App">
      <h1>AI Event Management System</h1>
      <Project />
      <MarketingDashboard />
      <EventMonitoring />
      <EventPlanner />
    </div>
  );
}

export default App;

