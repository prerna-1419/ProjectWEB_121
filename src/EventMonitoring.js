import React, { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummySessions = [
  {
    id: 1,
    title: "AI in Healthcare",
    room: "A101",
    capacity: 50,
    attendees: 72,
    delayed: false,
  },
  {
    id: 2,
    title: "Future of Web3",
    room: "B201",
    capacity: 100,
    attendees: 98,
    delayed: true,
  },
];

const dummyChartData = [
  { name: '10 AM', attendees: 40 },
  { name: '11 AM', attendees: 60 },
  { name: '12 PM', attendees: 72 },
];

const EventMonitoring = () => {
  const [showMonitoring, setShowMonitoring] = useState(false);

  const getSuggestions = (session) => {
    let suggestions = [];
    if (session.attendees > session.capacity) {
      suggestions.push("🚨 Room overcapacity! Suggest moving to larger hall or limit entry.");
    }
    if (session.delayed) {
      suggestions.push("⏰ Session is delayed! Notify attendees and reschedule if needed.");
    }
    return suggestions;
  };

  return (
    <motion.div
      className="monitoring-panel bg-white p-6 rounded-2xl shadow-md border border-gray-200 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button
        className="bg-gradient-to-r from-purple-400 to-blue-500 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-transform"
        onClick={() => setShowMonitoring(!showMonitoring)}
      >
        {showMonitoring ? "Hide" : "Show"} Real-Time Monitoring 📊
      </button>

      {showMonitoring && (
        <div className="mt-6 space-y-6">
          <h2 className="text-xl font-semibold mb-2">📊 Real-Time Event Monitoring</h2>
          {dummySessions.map((session) => (
            <motion.div
              key={session.id}
              className="monitoring-card bg-gray-50 p-4 rounded-xl shadow hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-800">{session.title} – {session.room}</h3>
              <p className="text-sm text-gray-600">Capacity: {session.capacity}, Attendees: {session.attendees}</p>
              {getSuggestions(session).map((s, i) => (
                <p key={i} className="suggestion text-sm text-red-500 mt-1">{s}</p>
              ))}
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={dummyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Line type="monotone" dataKey="attendees" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EventMonitoring;
