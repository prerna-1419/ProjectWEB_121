import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login/Registration Info:', { name, email });
    setSubmitted(true);
    setName('');
    setEmail('');
    onLogin(); // Triggers login state in App
  };

  return (
    <motion.div
      className="contact-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Login or Register</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enter Website</button>
        </form>
      ) : (
        <div className="confirmation">
          Redirecting you inside...
        </div>
      )}
    </motion.div>
  );
};

export default ContactForm;
