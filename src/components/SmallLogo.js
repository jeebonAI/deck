import React from 'react';
import { motion } from 'framer-motion';
import StylizedBusinessName from './StylizedBusinessName';

function SmallLogo({ businessName }) {
  return (
    <motion.div 
      style={{ 
        position: 'absolute',
        top: '25px',
        right: '30px',
        zIndex: 10
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <StylizedBusinessName 
        businessName={businessName} 
        size="1.8rem"
        delay={0.1}
      />
    </motion.div>
  );
}

export default SmallLogo;
