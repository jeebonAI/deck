import React from 'react';
import { motion } from 'framer-motion';

function SolutionSlide() {
  const pillars = [
    {
      title: "Communicate",
      description: "Secure, contextual chat/calls within groups",
      icon: "💬",
      delay: 1.0
    },
    {
      title: "Connect (Circles)",
      description: "Manage diverse groups with granular privacy",
      icon: "🔄",
      delay: 2.5
    },
    {
      title: "Cherish (Trees)",
      description: "Collaborative family legacy building",
      icon: "🌳",
      delay: 4.0
    },
    {
      title: "Curate (AI)",
      description: "Capture memories; AI enhances real-world connection",
      icon: "✨",
      delay: 5.5
    }
  ];

  return (
    <div className="slide solution-slide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Solution: Jiboni
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <h3>Unified Mobile App</h3>
        <p>One hub for your digital life story ("Jiboni")</p>
      </motion.div>

      <div
        className="flex-container"
        style={{ flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {pillars.map((pillar, index) => (
          <motion.div
            key={index}
            className="card"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: pillar.delay
            }}
            whileHover={{
              y: -10,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)"
            }}
            style={{
              width: '22%',
              minWidth: '200px',
              textAlign: 'center',
              position: 'relative'
            }}
          >

            <motion.div
              className="icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: pillar.delay + 0.1
              }}
              style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
            >
              {pillar.icon}
            </motion.div>
            <h4>{pillar.title}</h4>
            <p style={{ fontSize: '1rem' }}>{pillar.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 7.0 }}
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          background: 'rgba(69, 104, 220, 0.15)',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '80%'
        }}
      >
        <h3 style={{ color: 'var(--jiboni-primary)' }}>Core Value</h3>
        <p>Requires inviting your network = built-in growth</p>
      </motion.div>
    </div>
  );
}

export default SolutionSlide;
