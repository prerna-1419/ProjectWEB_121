import React, { useState, useEffect } from 'react';

import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Project = () => {
  const [events, setEvents] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const [budget, setBudget] = useState("");
  const [venueNeeds, setVenueNeeds] = useState("");
  const [workflow, setWorkflow] = useState([]);
  const [venueSuggestions, setVenueSuggestions] = useState([]);
  const [vendorSuggestions, setVendorSuggestions] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const addEvent = () => {
    const title = document.getElementById("eventTitle").value;
    const date = document.getElementById("eventDate").value;
    const description = document.getElementById("eventDescription").value;
    const location = document.getElementById("eventLocation").value;

    if (title && date && description && location) {
      const newEvent = { title, date, description, location };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(filterText.toLowerCase()) ||
    event.location.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleChat = () => {
    if (!chatInput) return;
    const userMessage = { type: "user", text: chatInput };
    const botMessage = { type: "bot", text: generateBotResponse(chatInput) };
    setChatMessages([...chatMessages, userMessage, botMessage]);
    setChatInput("");
  };

  const generateBotResponse = (input) => {
    input = input.toLowerCase();
    if (input.includes("event")) {
      return "I can help you with event details. Please specify the event name!";
    } else if (input.includes("location")) {
      return "You can find event locations in the event details section!";
    } else {
      return "I'm still learning! Try asking something about events.";
    }
  };

  const generateAISuggestions = () => {
    if (!budget) return;

    setVenueSuggestions([
      { name: "Skyline Hall", preview: "3D View", location: "NYC" },
      { name: "Grand Vista Hotel", preview: "3D View", location: "LA" }
    ]);

    setVendorSuggestions([
      "Budget Catering Co.",
      "Affordable A/V Services",
      "Local Decor Pros"
    ]);

    setWorkflow([
      "\uD83D\uDCC5 Define objectives",
      "\uD83D\uDCCA Allocate budget",
      "\uD83D\uDCCD Choose venue",
      "\uD83D\uDD0C Book vendors",
      "\uD83D\uDCE2 Start promotion"
    ]);
  };

  return (
    <motion.div
      className="App"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
    >
      <h1>AI Event Manager</h1>

      {/* Phase 1 */}
      <motion.section variants={fadeIn} transition={{ duration: 0.6, delay: 0.2 }}>
      <h2>📌 Phase 1: Event Planning & Design</h2>

        <input
          type="number"
          placeholder="Enter your budget \uD83D\uDCB0"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <input
          type="text"
          placeholder="Describe your venue needs \uD83C\uDFE8"
          value={venueNeeds}
          onChange={(e) => setVenueNeeds(e.target.value)}
        />
        <button onClick={generateAISuggestions}>Generate AI Suggestions ⚙️</button>

        {venueSuggestions.length > 0 && (
          <div>
            <h4>\uD83C\uDFE8 AI Venue Suggestions</h4>
            {venueSuggestions.map((venue, index) => (
              <motion.div key={index} whileHover={{ scale: 1.02 }}>
                <strong>{venue.name}</strong> ({venue.location}) - <a href="#">{venue.preview}</a>
              </motion.div>
            ))}
          </div>
        )}

        {vendorSuggestions.length > 0 && (
          <div>
            <h4> AI Vendor Suggestions</h4>
            <ul>
              {vendorSuggestions.map((vendor, idx) => (
                <motion.li key={idx} whileHover={{ scale: 1.02 }}>{vendor}</motion.li>
              ))}
            </ul>
          </div>
        )}

        {workflow.length > 0 && (
          <div>
            <h2>📌 Phase 1: Event Planning & Design</h2>

            <ol>
              {workflow.map((task, i) => (
                <motion.li key={i} variants={fadeIn}>{task}</motion.li>
              ))}
            </ol>
          </div>
        )}
      </motion.section>

      {/* Event Creation */}
      <div>
        <input id="eventTitle" placeholder="Event Title" />
        <input id="eventDate" type="date" />
        <input id="eventDescription" placeholder="Description" />
        <input id="eventLocation" placeholder="Location" />
        <button onClick={addEvent}>Add Event</button>
      </div>

      <input
        type="text"
        placeholder="Search events..."
        onChange={(e) => setFilterText(e.target.value)}
      />

      {/* Event Cards */}
      {filteredEvents.map((event, index) => (
        <motion.div
          key={index}
          className="event-item"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <strong>{event.title}</strong> - {event.date} <br />
          {event.description} <br /> \uD83D\uDCCD {event.location}
        </motion.div>
      ))}

      {/* Chatbot */}
      <div className="chatbot-container">
        <h2>Chatbot</h2>
        <div>
          {chatMessages.map((msg, index) => (
            <motion.div
              key={index}
              className={`chat-message ${msg.type}-message`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {msg.type === "user" ? "You: " : "Bot: "}{msg.text}
            </motion.div>
          ))}
        </div>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleChat}>Send</button>
      </div>
    </motion.div>
  );
};

export default Project;
