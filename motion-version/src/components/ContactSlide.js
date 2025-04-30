import React from 'react';
import { motion } from 'framer-motion';

function ContactSlide() {
  const contactInfo = [
    {
      icon: "✉",
      value: "contact@jiboni.com",
      delay: 2.5
    },
    {
      icon: "📱",
      value: "+1 (555) 123-4567",
      delay: 3.5
    },
    {
      icon: "🌐",
      value: "www.jiboni.com",
      delay: 4.5
    }
  ];

  const socialPlatforms = ['LinkedIn', 'Twitter', 'Instagram'];

  return (
    <div className="slide contact-slide">
      <div className="gradient-background" style={{ opacity: 0.15 }} />

      <div
        className="content"
        style={{ textAlign: 'center', zIndex: 1 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: '3.5rem' }}
        >
          Jiboni
        </motion.h1>

        <motion.h3
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 1.0
          }}
          style={{ color: 'var(--jiboni-light)', marginBottom: '2rem' }}
        >
          Build the future of meaningful connection, together.
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 1.5
          }}
          style={{ marginTop: '2rem' }}
        >
          <h3 style={{ color: 'var(--jiboni-light)', marginBottom: '1rem' }}>Nayeem Syed</h3>

          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: info.delay
              }}
              style={{ marginBottom: '0.8rem' }}
            >
              <span style={{
                display: 'inline-block',
                marginRight: '10px',
                color: 'var(--jiboni-secondary)'
              }}>{info.icon}</span>
              {info.value}
            </motion.div>
          ))}
        </motion.div>

        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
          }}
        >
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 5.5 + (index * 0.5)
              }}
              whileHover={{ y: -5, scale: 1.05 }}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              {platform}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactSlide;
