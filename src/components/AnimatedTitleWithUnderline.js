import React from 'react';
import { motion } from 'framer-motion';

function AnimatedTitleWithUnderline({ title, delay = 0.3 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ 
        position: 'relative',
        marginBottom: '2rem',
        textAlign: 'center'
      }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          fontSize: '2.5rem',
          color: 'white',
          display: 'inline-block',
          position: 'relative'
        }}
      >
        {title}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: delay }}
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: '0',
            right: '0',
            height: '2px',
            background: '#FF9800',
            transformOrigin: 'left'
          }}
        />
      </motion.h2>
    </motion.div>
  );
}

export default AnimatedTitleWithUnderline;