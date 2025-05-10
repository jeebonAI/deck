import React from 'react';
import { motion } from 'framer-motion';

function AnimatedTitleWithUnderline({ title }) {
  return (
    <div className="title-with-underline" style={{ 
      marginBottom: '1rem',
      textAlign: 'left',
      paddingLeft: '50px',  // Increased left padding to match image
      width: '100%'
    }}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          fontSize: '2.5rem',
          marginBottom: '0.5rem',
          color: 'var(--jeebon-light)',
          textAlign: 'left'  // Explicitly set text alignment to left
        }}
      >
        {title}
      </motion.h2>
      
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '60%' }}  // Changed to 50% to extend to middle of page
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{ 
          height: '4px',
          background: 'var(--jeebon-gradient)',
          borderRadius: '2px',
          marginLeft: '0',
          marginRight: 'auto'
        }}
      />
    </div>
  );
}

export default AnimatedTitleWithUnderline;
