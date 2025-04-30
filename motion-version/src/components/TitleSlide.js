import React from 'react';
import { motion } from 'framer-motion';

function TitleSlide() {
  return (
    <div className="slide title-slide">
      <div className="gradient-background" />

      <motion.div
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: '5rem' }}
        >
          Jiboni
        </motion.h1>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ color: 'var(--jiboni-light)', textAlign: 'center', fontSize: '2.2rem', marginTop: '1rem' }}
        >
          Connect, Communicate, Cherish, Curate
        </motion.h3>

        <motion.div
          className="tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            fontSize: '1.5rem',
            opacity: 0.9,
            marginTop: '3rem',
            textAlign: 'center'
          }}
        >
          Simplifying digital life, deepening real-world connections.
        </motion.div>
      </motion.div>
    </div>
  );
}

export default TitleSlide;
