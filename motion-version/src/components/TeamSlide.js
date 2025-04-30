import React from 'react';
import { motion } from 'framer-motion';

function TeamSlide() {
  // Since the short-version.md doesn't provide specific team details,
  // we'll create a placeholder team with visually appealing elements
  
  const team = [
    {
      name: "Nayeem Syed",
      role: "Founder & CEO",
      initial: "NS",
      color: "var(--jiboni-primary)"
    },
    {
      name: "Jane Smith",
      role: "CTO",
      initial: "JS",
      color: "var(--jiboni-secondary)"
    },
    {
      name: "Alex Chen",
      role: "Design Lead",
      initial: "AC",
      color: "#64B5F6"
    },
    {
      name: "Maya Patel",
      role: "Marketing",
      initial: "MP",
      color: "var(--jiboni-accent)"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };
  
  const memberVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="slide team-slide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Team
      </motion.h2>
      
      <motion.div 
        className="flex-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          marginTop: '2rem', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          gap: '2rem'
        }}
      >
        {team.map((member, index) => (
          <motion.div 
            key={index} 
            className="card"
            variants={memberVariants}
            whileHover={{ 
              y: -10, 
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" 
            }}
            style={{ 
              width: '200px',
              textAlign: 'center',
              padding: '2rem 1.5rem'
            }}
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: member.color,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white',
                margin: '0 auto 1rem',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
              }}
            >
              {member.initial}
            </motion.div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{member.name}</h3>
            <p style={{ fontSize: '1rem', opacity: 0.9 }}>{member.role}</p>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        style={{ 
          marginTop: '2rem', 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          maxWidth: '80%'
        }}
      >
        {['Passion', 'Innovation', 'Integrity', 'User-Focused', 'Collaboration'].map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              delay: 1.8 + index * 0.1 
            }}
            className="badge"
          >
            {value}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default TeamSlide;
