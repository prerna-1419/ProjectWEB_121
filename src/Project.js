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
  const [venueInfo, setVenueInfo] = useState(null);

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

  const getVenueInfo = (type) => {
    switch (type.toLowerCase()) {
      case 'wedding':
        return {
          image: '/download.jpeg',
          description: 'Elegant wedding venue with floral decor and spacious layout.',
        };
      case 'corporate':
        return {
          image: '/event-venues-north-america-civic-on-third-min.jpg',
          description: 'Professional space ideal for corporate meetings and presentations.',
        };
      case 'personal':
        return {
          image: '/Event-Venue-1024x452.jpg',
          description: 'Cozy and versatile venue perfect for birthdays or private parties.',
        };
      default:
        return null;
    }
  };

  const handleVenueGeneration = () => {
    if (!budget || !venueNeeds) return;
    const info = getVenueInfo(venueNeeds);
    setVenueInfo(info);
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

      {/* Phase 1 - Venue Suggestions */}
      <motion.section variants={fadeIn} transition={{ duration: 0.6, delay: 0.2 }}>
        <h2>📌 Venue Suggestion</h2>

        <input
          type="number"
          placeholder="Enter your budget 💰"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <input
          type="text"
          placeholder="Describe your venue needs 🏨 (wedding, corporate, personal)"
          value={venueNeeds}
          onChange={(e) => setVenueNeeds(e.target.value)}
        />
        <button onClick={handleVenueGeneration}>Show Venue</button>

        {venueInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <img
              src={venueInfo.image}
              alt={venueNeeds}
              className="w-full max-w-md mx-auto h-64 object-cover rounded-xl shadow-md mb-4"
            />
            <p className="text-gray-700 text-lg font-medium">{venueInfo.description}</p>
          </motion.div>
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
          {event.description} <br /> 📍 {event.location}
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
