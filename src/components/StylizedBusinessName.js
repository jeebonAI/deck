import React from 'react';
import { motion } from 'framer-motion';

function StylizedBusinessName({ businessName, size = 'large', delay = 0.3, animate = true, inline = false }) {
  // Size presets
  const sizes = {
    large: '5rem',
    medium: '3.5rem',
    small: '2.5rem'
  };
  
  const fontSize = sizes[size] || size; // Use preset or custom size
  
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, delay }
    }
  };
  
  return (
    <motion.div
      style={{
        position: 'relative',
        display: inline ? 'inline-block' : 'block'
      }}
    >
      <motion.div
        variants={animate ? textVariants : {}}
        initial={animate ? "hidden" : false}
        animate={animate ? "visible" : false}
        style={{ 
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.span
          style={{ 
            fontSize,
            background: 'var(--jeebon-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            fontWeight: 700,
            filter: 'brightness(1.2) contrast(1.1)',
            textShadow: '0 0 1px rgba(255,255,255,0.1)'
          }}
        >
          {businessName}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default StylizedBusinessName;
