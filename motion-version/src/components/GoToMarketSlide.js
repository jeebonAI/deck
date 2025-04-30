import React from 'react';
import { motion } from 'framer-motion';

function GoToMarketSlide() {
  const phases = [
    {
      year: "Year 1",
      title: "Develop & Validate",
      points: [
        "Build core product, achieve maturity",
        "Seed initial networks for feedback & validation",
        "Goal: 10k MAU",
        "Manage initial growth for stability"
      ],
      color: "var(--jiboni-primary)"
    },
    {
      year: "Year 2",
      title: "Monetize & Expand",
      points: [
        "Launch/refine premium tiers",
        "Expand outreach to diaspora hubs & communities",
        "Focus on validating monetization model"
      ],
      color: "var(--jiboni-secondary)"
    },
    {
      year: "Year 3+",
      title: "Scale Globally",
      points: [
        "Unleash network effects",
        "Scale marketing & partnerships",
        "Drive hyper-growth"
      ],
      color: "var(--jiboni-accent)"
    }
  ];

  return (
    <div className="slide gtm-slide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Go-to-Market Strategy - Phased
      </motion.h2>
      
      <div className="flex-container" style={{ marginTop: '2rem', alignItems: 'stretch' }}>
        {phases.map((phase, index) => (
          <motion.div 
            key={index}
            className="card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
            style={{ 
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              borderTop: `4px solid ${phase.color}`
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 1 + index * 0.2 
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: phase.color,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}
            >
              {index + 1}
            </motion.div>
            
            <h3 style={{ color: phase.color }}>{phase.year}</h3>
            <h4 style={{ marginBottom: '1rem' }}>{phase.title}</h4>
            
            <ul style={{ paddingLeft: '1.5rem' }}>
              {phase.points.map((point, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.5 + index * 0.3 + i * 0.1 }}
                  style={{ marginBottom: '0.8rem' }}
                >
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
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

export default GoToMarketSlide;
