import React from 'react';
import { motion } from 'framer-motion';

function BusinessModelSlide() {
  const tiers = [
    {
      title: "Free Core",
      items: [
        "Essential communication",
        "Circles",
        "Trees",
        "Memory features"
      ],
      footer: "FREE FOREVER",
      background: "rgba(255, 255, 255, 0.05)",
      delay: 1.0
    },
    {
      title: "Premium Tiers (Year 2+)",
      items: [
        "Enhanced Storage",
        "Advanced AI Features",
        "Advanced Circle/Tree Tools",
        "Premium Support"
      ],
      footer: "Target ARPPU ~$60/yr",
      footerColor: "var(--jiboni-secondary)",
      background: "rgba(69, 104, 220, 0.1)",
      delay: 3.0
    }
  ];

  return (
    <div className="slide business-model-slide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Business Model: Freemium
      </motion.h2>

      <div
        className="flex-container"
        style={{ marginTop: '2rem', alignItems: 'stretch' }}
      >
        {tiers.map((tier, index) => (
          <motion.div
            key={index}
            className="card"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: tier.delay
            }}
            style={{
              flex: 1,
              background: tier.background,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, delay: tier.delay + 0.3 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '5px',
                background: 'var(--jiboni-gradient)'
              }}
            />
            <h3>{tier.title}</h3>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
              {tier.items.map((item, itemIndex) => (
                <motion.li
                  key={itemIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: tier.delay + 0.5 + (itemIndex * 0.4) }}
                  style={{ marginBottom: '0.8rem' }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: tier.delay + 2.0, duration: 0.5 }}
              style={{
                marginTop: '1.5rem',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: tier.footerColor || 'inherit'
              }}
            >
              {tier.footer}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 6.0 }}
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '80%'
        }}
      >
        <h3>Focus</h3>
        <p>Value-driven monetization, not data exploitation. Potential for future revenue streams (partnerships, vaults).</p>
      </motion.div>
    </div>
  );
}

export default BusinessModelSlide;
