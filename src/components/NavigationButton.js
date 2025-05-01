import React from 'react';
import { motion } from 'framer-motion';

// Shared button component for navigation and home buttons
function NavigationButton({ onClick, title, children }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        minWidth: '60px',
        height: '26px'
      }}
      title={title}
    >
      {children}
    </motion.button>
  );
}

export default NavigationButton;
