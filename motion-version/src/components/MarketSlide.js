import React from 'react';
import { motion } from 'framer-motion';

function MarketSlide() {
  const marketSegments = [
    {
      title: "TAM",
      description: "Billions globally facing digital fatigue & seeking deeper connection.",
      note: "Growing PKM, journaling, digital legacy markets",
      barHeight: "150px",
      delay: 1.0
    },
    {
      title: "SAM",
      description: "Digitally connected individuals needing integrated communication, group management, memory tools, and privacy.",
      note: "Including large diasporas like Desi >35M",
      barHeight: "100px",
      delay: 2.5
    },
    {
      title: "Niche",
      description: "Underserved need for a truly integrated private platform combining:",
      items: ["Communication", "Circles", "Legacy", "Connection-focused AI"],
      delay: 4.0
    }
  ];

  return (
    <div className="slide market-slide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Market Opportunity
      </motion.h2>

      <div
        className="flex-container"
        style={{ marginTop: '2rem', alignItems: 'stretch' }}
      >
        {marketSegments.map((segment, index) => (
          <motion.div
            key={index}
            className="card"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: segment.delay
            }}
            style={{ flex: 1 }}
          >
            <h3>{segment.title}</h3>
            <p>{segment.description}</p>

            {segment.barHeight && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: segment.delay + 0.5 }}
                style={{
                  height: segment.barHeight,
                  background: 'var(--jiboni-gradient)',
                  borderRadius: '8px',
                  marginTop: '1rem',
                  transformOrigin: 'bottom'
                }}
              />
            )}

            {segment.note && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: segment.delay + 1.0 }}
                style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}
              >
                {segment.note}
              </motion.p>
            )}

            {segment.items && (
              <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                {segment.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: segment.delay + 0.5 + (itemIndex * 0.4) }}
                    style={{ marginBottom: '0.5rem', fontSize: '1rem' }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 6.0 }}
        style={{
          marginTop: '2rem',
          width: '80%',
          height: '4px',
          background: 'var(--jiboni-gradient)',
          borderRadius: '2px',
          transformOrigin: 'left'
        }}
      />
    </div>
  );
}

export default MarketSlide;
