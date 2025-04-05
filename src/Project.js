import React, { useEffect, useState } from "react";

const App = () => {
    const [events, setEvents] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    // Phase 1 AI features
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

    // --- Phase 1 AI Feature Logic ---

    const generateAISuggestions = () => {
        if (!budget) return;

        // Mock AI logic
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
            "📅 Define objectives",
            "📊 Allocate budget",
            "📍 Choose venue",
            "🔌 Book vendors",
            "📢 Start promotion"
        ]);
    };

    return (
        <div>
            <h1>AI Event Manager</h1>

            {/* Phase 1: Planning Section */}
            <section style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "10px", marginBottom: "20px" }}>
                <h2>📌 Phase 1: Event Planning & Design</h2>
                <div>
                    <input
                        type="number"
                        placeholder="Enter your budget 💰"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        style={{ marginRight: "10px" }}
                    />
                    <input
                        type="text"
                        placeholder="Describe your venue needs 🏨"
                        value={venueNeeds}
                        onChange={(e) => setVenueNeeds(e.target.value)}
                    />
                    <button onClick={generateAISuggestions} style={{ marginLeft: "10px" }}>
                        Generate AI Suggestions ⚙️
                    </button>
                </div>

                {venueSuggestions.length > 0 && (
                    <div>
                        <h4>🏨 AI Venue Suggestions</h4>
                        {venueSuggestions.map((venue, index) => (
                            <div key={index}>
                                <strong>{venue.name}</strong> ({venue.location}) - <a href="#">{venue.preview}</a>
                            </div>
                        ))}
                    </div>
                )}

                {vendorSuggestions.length > 0 && (
                    <div>
                        <h4>🤝 AI Vendor Suggestions</h4>
                        <ul>
                            {vendorSuggestions.map((vendor, idx) => (
                                <li key={idx}>{vendor}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {workflow.length > 0 && (
                    <div>
                        <h4>📅 Automated Planning Workflow</h4>
                        <ol>
                            {workflow.map((task, i) => (
                                <li key={i}>{task}</li>
                            ))}
                        </ol>
                    </div>
                )}
            </section>

            {/* Add Event Section */}
            <div>
                <input id="eventTitle" placeholder="Event Title" />
                <input id="eventDate" type="date" />
                <input id="eventDescription" placeholder="Description" />
                <input id="eventLocation" placeholder="Location" />
                <button onClick={addEvent}>Add Event</button>
            </div>

            {/* Filter Events */}
            <input
                type="text"
                placeholder="Search events..."
                onChange={(e) => setFilterText(e.target.value)}
            />

            {/* Display Events */}
            <div>
                {filteredEvents.map((event, index) => (
                    <div key={index} className="event-item">
                        <strong>{event.title}</strong> - {event.date} <br />
                        {event.description} <br /> 📍 {event.location}
                    </div>
                ))}
            </div>

            {/* Chatbot Section */}
            <div>
                <h2>Chatbot</h2>
                <div>
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.type}-message`}>
                            {msg.type === "user" ? "You: " : "Bot: "}{msg.text}
                        </div>
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
        </div>
    );
};

export default App;
