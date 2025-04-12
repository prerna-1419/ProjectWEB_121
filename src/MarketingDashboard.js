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
  const [showSocials, setShowSocials] = useState(false);

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">
      <h2 className="text-3xl font-bold mb-6">📢 AI-Driven Marketing Dashboard</h2>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
        <Button onClick={() => setShowSocials(!showSocials)}>
          {showSocials ? '🙈 Hide Social Media' : '🔗 Show Social Media'}
        </Button>
      </div>

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
              <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <Button>🐦 Twitter</Button>
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              <Button>💼 LinkedIn</Button>
              </a>
              <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <Button>📘 Facebook</Button>
              </a>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketingDashboard;

