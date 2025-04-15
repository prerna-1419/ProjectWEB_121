import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Project = () => {
  const [events, setEvents] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [budget, setBudget] = useState('');
  const [venueNeeds, setVenueNeeds] = useState('');
  const [venueInfo, setVenueInfo] = useState(null);
  const [venueType, setVenueType] = useState('');
  const [personalSubtype, setPersonalSubtype] = useState('');

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const addEvent = () => {
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const description = document.getElementById('eventDescription').value;
    const location = document.getElementById('eventLocation').value;

    if (title && date && description && location) {
      const newEvent = { title, date, description, location };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(filterText.toLowerCase()) ||
    event.location.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleVenueGeneration = () => {
    const type = venueNeeds.toLowerCase();
    const budgetValue = parseInt(budget);
    setVenueType(type);
    setVenueInfo(null);
    setPersonalSubtype('');

    if (type.includes('wedding')) {
      if (budgetValue < 100000) {
        setVenueInfo({
          image: process.env.PUBLIC_URL + '/Goa.jpeg',
          description: 'Budget-friendly beach wedding venue in Goa.',
        });
      } else if (budgetValue < 300000) {
        setVenueInfo({
          image: process.env.PUBLIC_URL + '/Jaipur.jpeg',
          description: 'Mid-range resort in Jaipur, perfect for elegant weddings.',
        });
      } else {
        setVenueInfo({
          image: process.env.PUBLIC_URL + '/Udaipur.jpeg',
          description: 'Premium Udaipur palace venue with royal charm.',
        });
      }
    } else if (type.includes('corporate')) {
      setVenueInfo({
        image: process.env.PUBLIC_URL + '/event-venues-north-america-civic-on-third-min.jpg',
        description: 'Corporate hall with AV setup and modern seating.',
      });
    } else if (type.includes('personal')) {
      // Subtype buttons will render below
    }
  };

  const handlePersonalSelection = (subtype) => {
    setPersonalSubtype(subtype);
    const budgetValue = parseInt(budget);

    const venues = {
      birthday: {
        basic: {
          image: process.env.PUBLIC_URL + '/Birthday1.jpeg',
          description: 'Cozy hall with decorations and music setup.',
        },
        standard: {
          image: process.env.PUBLIC_URL + '/Birthday2.jpeg',
          description: 'Mid-size birthday venue with buffet and balloon decor.',
        },
        luxury: {
          image: process.env.PUBLIC_URL + '/Birthday3.jpeg',
          description: 'Premium suite with DJ, lighting, and photo booth.',
        },
      },
      ring: {
        basic: {
          image: process.env.PUBLIC_URL + '/ring1.jpeg',
          description: 'Small ring ceremony setup with floral backdrop.',
        },
        standard: {
          image: process.env.PUBLIC_URL + '/ring2.jpeg',
          description: 'Banquet seating for 80+ with catering.',
        },
        luxury: {
          image: process.env.PUBLIC_URL + '/ring3.jpeg',
          description: 'Luxury ring ceremony with live music and decor.',
        },
      },
      private: {
        basic: {
          image: process.env.PUBLIC_URL + '/party1.jpeg',
          description: 'Simple private gathering space with food.',
        },
        standard: {
          image: process.env.PUBLIC_URL + '/party2.jpeg',
          description: 'Indoor lounge with buffet setup.',
        },
        luxury: {
          image: process.env.PUBLIC_URL + '/party3.jpg',
          description: 'Luxe private party lounge with DJ and cocktails.',
        },
      },
    };

    if (budgetValue < 30000) {
      setVenueInfo(venues[subtype].basic);
    } else if (budgetValue < 80000) {
      setVenueInfo(venues[subtype].standard);
    } else {
      setVenueInfo(venues[subtype].luxury);
    }
  };

  const resetForm = () => {
    setBudget('');
    setVenueNeeds('');
    setVenueInfo(null);
    setVenueType('');
    setPersonalSubtype('');
  };

  return (
    <motion.div className="App" initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.6 }}>
      {/* Venue Suggestion */}
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
          placeholder="Venue needs (wedding, corporate, personal)"
          value={venueNeeds}
          onChange={(e) => setVenueNeeds(e.target.value)}
        />
        <button onClick={handleVenueGeneration}>Generate Venue</button>
        <button onClick={resetForm}>Reset</button>

        {venueType.includes('personal') && !venueInfo && (
          <div style={{ marginTop: '1rem' }}>
            <p>Select personal event type:</p>
            <button onClick={() => handlePersonalSelection('birthday')}>🎂 Birthday Party</button>
            <button onClick={() => handlePersonalSelection('ring')}>💍 Ring Ceremony</button>
            <button onClick={() => handlePersonalSelection('private')}>🎉 Private Party</button>
          </div>
        )}

        {venueInfo && (
          <div style={{ marginTop: '1rem' }}>
            <img
              src={venueInfo.image}
              alt="Venue"
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                borderRadius: '10px',
                objectFit: 'cover',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <p style={{ marginTop: '10px' }}>{venueInfo.description}</p>
          </div>
        )}
      </motion.section>

      {/* Events Section */}
      <motion.section variants={fadeIn} transition={{ duration: 0.6, delay: 0.4 }}>
        <h2>📅 Event List</h2>
        <input
          type="text"
          placeholder="Search by title or location"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        {filteredEvents.map((event, index) => (
          <div key={index}>
            <h4>{event.title}</h4>
            <p>{event.date} - {event.location}</p>
            <p>{event.description}</p>
          </div>
        ))}
        <div style={{ marginTop: '1rem' }}>
          <input id="eventTitle" type="text" placeholder="Event Title" />
          <input id="eventDate" type="date" />
          <input id="eventLocation" type="text" placeholder="Location" />
          <input id="eventDescription" type="text" placeholder="Description" />
          <button onClick={addEvent}>Add Event</button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Project;
