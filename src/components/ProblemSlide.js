import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ProblemSlide({ registerSlideSteps, currentStep }) {
  // Define the key problems with titles, descriptions, and icons
  const problemItems = [
    {
      title: "Digital Disconnect",
      description: "Most of today's digital apps are moving us to a superficial world disconnecting us more and more from the real world.",
      icon: "🔌",
      iconBgColor: "rgba(69, 104, 220, 0.3)" // Blue-ish background for contrast
    },
    {
      title: "Passive Consumption",
      description: "Algorithmic timelines designed to maximize engagement time can trap us into passive consumption, losing valuable time and reduced productivity.",
      icon: "📱",
      iconBgColor: "rgba(176, 106, 179, 0.3)" // Purple-ish background for contrast
    },
    {
      title: "Fragmented Histories",
      description: "Personal memories, family narratives, group histories, and even important communications are easily lost, scattered across platforms, leading to a fading of personal and collective memory.",
      icon: "🧩",
      iconBgColor: "rgba(255, 126, 95, 0.3)" // Orange-ish background for contrast
    },
    {
      title: "Connections Management",
      description: "Organizing communications within distinct groups (family, friends, work teams, hobby clubs, community etc) is cumbersome leading to losing important real world connections forever.",
      icon: "👥",
      iconBgColor: "rgba(46, 213, 115, 0.3)" // Green-ish background for contrast
    }
  ];

  // Register the total number of steps for this slide
  useEffect(() => {
    registerSlideSteps(problemItems.length + 1); // +1 for the heading
  }, [registerSlideSteps, problemItems.length]);

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Any slide-specific keyboard actions
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="slide problem-slide">
      <AnimatePresence>
        {currentStep >= 1 && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            The Problem
          </motion.h2>
        )}
      </AnimatePresence>

      <div className="problems-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <AnimatePresence>
          {problemItems.map((problem, index) => (
            currentStep >= index + 2 && (
              <motion.div
                key={problem.title}
                className="problem-item"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div className="problem-header" style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div className="problem-icon" style={{
                    fontSize: '2rem',
                    marginRight: '1rem',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: problem.iconBgColor,
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}>{problem.icon}</div>
                  <h4 className="problem-title" style={{
                    color: 'var(--jiboni-accent)',
                    fontSize: '1.4rem',
                    margin: 0
                  }}>{problem.title}</h4>
                </div>
                <p className="problem-description" style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.5',
                  flex: 1
                }}>{problem.description}</p>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProblemSlide;
