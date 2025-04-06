import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Card Component
const Card = ({ children }) => (
  <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 border border-gray-200">
    {children}
  </div>
);

// Styled Button
const Button = ({ children, ...props }) => (
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition w-full sm:w-auto"
    {...props}
  >
    {children}
  </button>
);

const MarketingDashboard = () => {
  const [showStats, setShowStats] = useState(false);
  const [showEmails, setShowEmails] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">
      <h2 className="text-3xl font-bold mb-6">📢 AI-Driven Marketing Dashboard</h2>

      {/* Summary Card */}
      <Card>
        <h3 className="text-xl font-semibold mb-3">📈 Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Emails Sent</p>
            <p className="text-lg font-bold">12,300</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Open Rate</p>
            <p className="text-lg font-bold">67%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Top Channel</p>
            <p className="text-lg font-bold">LinkedIn 🔗</p>
          </div>
        </div>
      </Card>

      {/* Buttons to Toggle Sections */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
        <Button onClick={() => setShowStats(!showStats)}>
          {showStats ? '🙈 Hide Engagement Stats' : '📊 Show Engagement Stats'}
        </Button>
        <Button onClick={() => setShowEmails(!showEmails)}>
          {showEmails ? '❌ Hide Email Campaigns' : '📧 Show Email Campaigns'}
        </Button>
        <Button onClick={() => setShowSocials(!showSocials)}>
          {showSocials ? '🙈 Hide Social Media' : '🔗 Show Social Media'}
        </Button>
      </div>

      {/* Engagement Stats Section */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <h3 className="text-xl font-semibold mb-2">📊 Engagement Stats</h3>
              <p>Open Rate: 65%</p>
              <p>Click Rate: 40%</p>
              <p>Bounce Rate: 5%</p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Campaigns Section */}
      <AnimatePresence>
        {showEmails && (
          <motion.div
            key="emails"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <h3 className="text-xl font-semibold mb-2">📧 Email Campaigns</h3>
              <p className="mb-2">Subject: “You're Invited!”</p>
              <p className="mb-4">Body: “Join us for a one-of-a-kind event experience…”</p>
              <Button>📤 Send Test Email</Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Media Section */}
      <AnimatePresence>
        {showSocials && (
          <motion.div
            key="socials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <h3 className="text-xl font-semibold mb-2">🔗 Social Media</h3>
              <div className="flex space-x-4">
                <Button>🐦 Twitter</Button>
                <Button>💼 LinkedIn</Button>
                <Button>📘 Facebook</Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketingDashboard;
