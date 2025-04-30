import React from 'react';
import { motion } from 'framer-motion';

function ProblemSlide() {
  // App icons for illustration
  const AppIcon = ({ name, color, delay }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: delay
      }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        backgroundColor: color,
        margin: '0 5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      }}
    >
      {name.charAt(0)}
    </motion.div>
  );

  const resultItems = [
    "Fragmented communication",
    "Lost context",
    "Superficial connections",
    "Scattered memories"
  ];

  return (
    <div className="slide problem-slide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        The Problem
      </motion.h2>

      <div className="flex-container" style={{ marginTop: '2rem' }}>
        <motion.div
          className="card"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 1.0
          }}
          style={{ flex: 1 }}
        >
          <h3>Digital Overload</h3>
          <p>We're drowning in apps (WhatsApp, Slack, Facebook, etc.)</p>
          <div style={{
            marginTop: '1.5rem',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <AppIcon name="WhatsApp" color="#25D366" delay={1.5} />
            <AppIcon name="Slack" color="#4A154B" delay={1.7} />
            <AppIcon name="Facebook" color="#1877F2" delay={1.9} />
            <AppIcon name="Instagram" color="#E1306C" delay={2.1} />
            <AppIcon name="Twitter" color="#1DA1F2" delay={2.3} />
          </div>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 2.8
          }}
          style={{ flex: 1 }}
        >
          <h3>The Result</h3>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
            {resultItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 3.3 + (index * 0.5) }}
                style={{ marginBottom: '0.8rem' }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 5.5 }}
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          background: 'rgba(255, 126, 95, 0.15)',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '80%'
        }}
      >
        <h3 style={{ color: 'var(--jiboni-accent)' }}>The Need</h3>
        <p>A unified platform for meaningful connection, privacy, and organization.</p>
      </motion.div>
    </div>
  );
}

export default ProblemSlide;
