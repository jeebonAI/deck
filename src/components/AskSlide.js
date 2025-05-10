import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';
import SmallLogo from './SmallLogo';

function AskSlide({ registerSlideSteps, currentStep, totalSlides, showSlideNumber, businessName }) {
  // Register only 1 step for this slide
  useEffect(() => {
    registerSlideSteps(1);
  }, [registerSlideSteps]);

  // Calculate slide number (Ask is slide 12 in the deck)
  const slideNumber = 12;
  const slideNumberText = `${slideNumber}/${totalSlides}`;

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

  const fundUse = [
    { category: "Core Product & AI Resources", percentage: 25, color: "var(--jeebon-primary)" },
    { category: "Team & Development", percentage: 40, color: "var(--jeebon-secondary)" },
    { category: "User Acquisition / Marketing", percentage: 25, color: "var(--jeebon-accent)" },
    { category: "Operations / Setup", percentage: 10, color: "#64B5F6" }
  ];

  // Calculate the cumulative angles for the pie chart
  const calculatePieSegments = () => {
    let cumulativePercentage = 0;
    return fundUse.map(item => {
      const startAngle = cumulativePercentage * 3.6; // 3.6 degrees per percentage point (360 / 100)
      cumulativePercentage += item.percentage;
      const endAngle = cumulativePercentage * 3.6;
      return {
        ...item,
        startAngle,
        endAngle
      };
    });
  };

  const pieSegments = calculatePieSegments();

  // Function to create the SVG path for a pie segment
  const createPieSegment = (startAngle, endAngle, radius) => {
    // Convert angles from degrees to radians
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    const x1 = radius + radius * Math.cos(startRad);
    const y1 = radius + radius * Math.sin(startRad);
    const x2 = radius + radius * Math.cos(endRad);
    const y2 = radius + radius * Math.sin(endRad);
    
    // Determine if the arc should be drawn the long way around
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
  };

  // Function to calculate the position for text in each pie segment
  const calculateTextPosition = (startAngle, endAngle, radius, textDistance = 0.6) => {
    // Find the middle angle of the segment
    const midAngle = (startAngle + endAngle) / 2;
    // Convert to radians and adjust for SVG coordinate system
    const midRad = (midAngle - 90) * Math.PI / 180;
    // Calculate position at a certain distance from center (textDistance controls how far from center)
    const x = radius + radius * textDistance * Math.cos(midRad);
    const y = radius + radius * textDistance * Math.sin(midRad);
    
    return { x, y };
  };

  return (
    <div className="slide ask-slide" style={{ 
      justifyContent: 'flex-start', 
      paddingTop: '2rem',
      position: 'relative',
      width: '90%',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Small logo in top right */}
      <SmallLogo businessName={businessName} />
      
      {/* Slide number indicator - only show if showSlideNumber is true */}
      {showSlideNumber && (
        <div className="slide-number" style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.6)',
          padding: '4px 8px',
          borderRadius: '12px',
          background: 'rgba(69, 104, 220, 0.2)',
          backdropFilter: 'blur(4px)',
          fontWeight: '500'
        }}>
          {slideNumberText}
        </div>
      )}

      <AnimatedTitleWithUnderline title="The Ask" />

      <div style={{ 
        display: 'flex',
        width: '90%',
        maxWidth: '1000px',
        marginTop: '2rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        {/* Left side with amount */}
        <div style={{ 
          width: '25%',
          position: 'relative'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            style={{ 
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              textAlign: 'center',
              width: '100%',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}
          >
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'rgba(46, 213, 115, 0.9)' }}>$500k - $800k</span>
            </h3>
            <p style={{ fontSize: '1.3rem', margin: '0.5rem 0' }}>Pre-Seed Funding</p>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: '0.5rem 0' }}>
              (12-18 months runway)
            </p>
          </motion.div>
        </div>
        
        {/* Chevron from Ask to Pie - MUCH thicker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60px'
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M20 10L40 30L20 50" 
              stroke="rgba(46, 213, 115, 0.9)" 
              strokeWidth="16" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        
        {/* Middle with pie chart */}
        <div style={{ 
          width: '35%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* SVG Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            style={{ 
              width: '280px',
              height: '280px',
              position: 'relative',
              marginBottom: '1rem'
            }}
          >
            <svg width="280" height="280" viewBox="0 0 280 280">
              {pieSegments.map((segment, index) => (
                <motion.g key={index}>
                  <motion.path
                    d={createPieSegment(segment.startAngle, segment.endAngle, 140)}
                    fill={segment.color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    stroke="#1E293B"
                    strokeWidth="1"
                  />
                  {(() => {
                    const textPos = calculateTextPosition(segment.startAngle, segment.endAngle, 140);
                    return (
                      <motion.text
                        x={textPos.x}
                        y={textPos.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontWeight="bold"
                        fontSize="18"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        {segment.percentage}%
                      </motion.text>
                    );
                  })()}
                </motion.g>
              ))}
            </svg>
          </motion.div>
          
          {/* Legend */}
          <div style={{ width: '100%' }}>
            {fundUse.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}
              >
                <div style={{ 
                  width: '14px',
                  height: '14px',
                  backgroundColor: item.color,
                  marginRight: '8px',
                  borderRadius: '3px'
                }}></div>
                <div style={{ 
                  flex: 1, 
                  fontSize: '0.9rem', 
                  whiteSpace: 'nowrap', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis',
                  paddingRight: '5px'
                }}>
                  {item.category}
                </div>
                <div style={{ 
                  width: '35px',
                  textAlign: 'right',
                  fontWeight: '500',
                  fontSize: '0.9rem'
                }}>
                  {item.percentage}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Chevron from Pie to Achieve - MUCH thicker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60px'
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M20 10L40 30L20 50" 
              stroke="rgba(46, 213, 115, 0.9)" 
              strokeWidth="16" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        
        {/* Right side with Achieve box */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            width: '25%',
            padding: '1.5rem',
            background: 'rgba(46, 213, 115, 0.15)',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(46, 213, 115, 0.1)'
          }}
        >
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
              margin: '0.25rem 0 0.75rem', 
              fontSize: '1.2rem',
              color: 'rgba(46, 213, 115, 0.9)' // Green tint to heading
            }}
          >
            Achieve
          </motion.h4>
          <div style={{ 
            margin: '0.5rem 0', 
            padding: 0,
            fontSize: '0.95rem', 
            lineHeight: '1.8',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {[
              "Launch",
              "10k MAU",
              "Validate Model",
              "Initiate AI",
              "Prepare for Scale"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.3 + (index * 0.15) // Shorter delays
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AskSlide;
