
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';

function FinancialsSlide({ registerSlideSteps, currentStep, totalSlides, showSlideNumber }) {
  // Register just one step for this slide
  useEffect(() => {
    registerSlideSteps(1);
  }, [registerSlideSteps]);

  // Add PDF mode detection and handling
  useEffect(() => {
    // Check if we're in PDF mode
    const isPdfMode = document.body.classList.contains('pdf-mode') || 
                      new URLSearchParams(window.location.search).get('pdf') === 'true';
    
    if (isPdfMode) {
      // Force all animations to complete immediately
      const forceAnimationsComplete = setTimeout(() => {
        // Apply PDF-specific styles to ensure all content is visible
        const slideElement = document.querySelector('.financials-slide');
        if (slideElement) {
          // Adjust the container itself to match other slides
          slideElement.style.transform = 'scale(0.9)';
          slideElement.style.transformOrigin = 'center center';
          slideElement.style.height = '75%'; // Further reduced from 80% to 75% to add more bottom margin
          slideElement.style.width = '100%';
          slideElement.style.overflow = 'visible';
          slideElement.style.display = 'flex';
          slideElement.style.flexDirection = 'column';
          slideElement.style.justifyContent = 'flex-start';
          slideElement.style.alignItems = 'center';
          slideElement.style.padding = '20px';
          slideElement.style.margin = '0 auto';
          slideElement.style.marginTop = '70px'; // Keep top margin
          slideElement.style.marginBottom = '70px'; // Increased bottom margin from 50px to 70px
          
          // Adjust the title position
          const title = slideElement.querySelector('.title-with-underline');
          if (title) {
            title.style.marginTop = '0';
            title.style.marginBottom = '15px'; // Reduced margin below title
          }
          
          // Adjust the flex container
          const flexContainer = slideElement.querySelector('.flex-container');
          if (flexContainer) {
            flexContainer.style.height = 'auto';
            flexContainer.style.width = '100%';
            flexContainer.style.maxWidth = '1000px';
            flexContainer.style.gap = '15px'; // Further reduced gap between rows
            flexContainer.style.justifyContent = 'flex-start';
            flexContainer.style.alignItems = 'stretch';
            flexContainer.style.margin = '0 auto';
            flexContainer.style.marginTop = '5px';
          }
          
          // Adjust top row
          const topRow = slideElement.querySelector('.flex-container > div:first-child');
          if (topRow) {
            topRow.style.flex = '2.5'; // Increased from 2 to 2.5
            topRow.style.marginBottom = '5px'; // Reduced margin
            topRow.style.minHeight = '300px'; // Increased height from 260px to 300px
            topRow.style.maxHeight = '320px'; // Increased height from 280px to 320px
            topRow.style.width = '100%';
            topRow.style.display = 'flex';
            topRow.style.justifyContent = 'space-between';
          }
          
          // Adjust bottom row - give more height for text
          const bottomRow = slideElement.querySelector('.flex-container > div:last-child');
          if (bottomRow) {
            bottomRow.style.flex = '2'; // Increased from 1.8 to 2
            bottomRow.style.marginTop = '5px';
            bottomRow.style.display = 'flex';
            bottomRow.style.visibility = 'visible';
            bottomRow.style.minHeight = '280px'; // Increased height from 240px to 280px
            bottomRow.style.maxHeight = '300px'; // Increased height from 260px to 300px
            bottomRow.style.width = '100%';
            bottomRow.style.justifyContent = 'space-between';
          }
          
          // Adjust the chart containers to be taller
          const chartContainers = slideElement.querySelectorAll('.card > div[style*="position: relative"]');
          chartContainers.forEach(container => {
            container.style.height = '100%'; // Make sure it takes full height
            container.style.minHeight = '250px'; // Set minimum height
          });
          
          // Make bottom cards more spacious
          const bottomCards = bottomRow.querySelectorAll('.card');
          bottomCards.forEach(card => {
            card.style.overflow = 'visible';
            card.style.height = 'auto';
            card.style.padding = '15px'; // Increased padding
            card.style.margin = '0';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.justifyContent = 'space-between';
          });
          
          // Adjust font sizes in bottom row to fit better
          const bottomTexts = bottomRow.querySelectorAll('div, p, span, h3');
          bottomTexts.forEach(text => {
            text.style.fontSize = '0.85rem'; // Increased font size
            text.style.lineHeight = '1.4'; // Increased line height
            text.style.marginBottom = '5px'; // More space between lines
          });
          
          // Specifically target the Strategic Notes section to ensure all points are visible
          const strategicNotes = bottomRow.querySelector('.card:last-child');
          if (strategicNotes) {
            strategicNotes.style.minHeight = '240px'; // Increased height
            strategicNotes.style.flex = '1.8'; // Give even more space to notes section
            strategicNotes.style.overflow = 'visible';
            
            // Make sure all note items are visible with reduced spacing
            const noteItems = strategicNotes.querySelectorAll('div[style*="display: flex"]');
            noteItems.forEach(item => {
              item.style.marginBottom = '5px'; // Reduced space between bullet points
              item.style.opacity = '1';
              item.style.visibility = 'visible';
              item.style.display = 'flex !important';
              
              // Reduce font size slightly to fit more content
              const textElement = item.querySelector('div:last-child');
              if (textElement) {
                textElement.style.fontSize = '0.7rem';
                textElement.style.lineHeight = '1.2';
              }
            });
          }
          
          // Adjust the Key Metrics section
          const keyMetrics = bottomRow.querySelector('.card:first-child');
          if (keyMetrics) {
            keyMetrics.style.flex = '0.8'; // Further reduced flex to give more space to notes
            keyMetrics.style.minHeight = '240px'; // Match height
          }
          
          // Adjust the chart bar heights moderately
          const chartBars = slideElement.querySelectorAll('motion.div[style*="height"]');
          chartBars.forEach(bar => {
            const heightStyle = bar.style.height;
            if (heightStyle && heightStyle.includes('%')) {
              const heightPercent = parseFloat(heightStyle);
              const newHeight = Math.max(heightPercent * 0.7, 3) + '%'; // Less reduction
              bar.style.height = newHeight;
            }
          });
        }
      }, 1000);
      
      return () => clearTimeout(forceAnimationsComplete);
    }
  }, []);

  // Financial projections visualization
  const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
  
  // These values match the short-version.md data
  const revenue = [0, 27, 342, 1100, 2600]; // in thousands ($k)
  const costs = [180, 220, 400, 650, 1000]; // in thousands ($k)
  const netProfit = revenue.map((rev, i) => rev - costs[i]); // Calculate net profit
  const users = [10, 25, 200, 600, 1500]; // in thousands (k)
  
  const maxRevenue = Math.max(...revenue);
  const maxCost = Math.max(...costs);
  const maxFinancial = Math.max(maxRevenue, maxCost);
  const maxUsers = Math.max(...users);
  const minProfit = Math.min(...netProfit);
  const maxProfit = Math.max(...netProfit);
  // eslint-disable-next-line no-unused-vars
  const profitRange = Math.max(Math.abs(minProfit), Math.abs(maxProfit));

  // Format numbers for display
  const formatNumber = (num) => {
    if (num === 0) return '0';
    if (Math.abs(num) >= 1000) return `${(num/1000).toFixed(1)}M`;
    return `${num}K`;
  };

  // Calculate slide number (Financials is slide 11 in the deck)
  const slideNumber = 11;
  const slideNumberText = `${slideNumber}/${totalSlides}`;

  return (
    <div className="slide financials-slide" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      height: '75%', // Reduced from 80% to 75%
      padding: '1rem',
      margin: '0 auto',
      marginTop: '20px', // Reduced from 30px to 20px to move everything up more
      marginBottom: '40px',
      position: 'relative'
    }}>
      {/* Slide number indicator - only show if showSlideNumber is true */}
      {showSlideNumber && (
        <div className="slide-number" style={{
          position: 'absolute',
          bottom: '-40px',
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
      
      <AnimatedTitleWithUnderline title="Financials" />
      
      <div className="flex-container" style={{ 
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'calc(100% - 30px)', // Reduced from calc(100% - 40px)
        justifyContent: 'flex-start',
        marginTop: '0px' // Reduced from 5px to 0px to move content closer to title
      }}>
        {/* Top row with MAU and Revenue/Costs charts */}
        <div style={{ 
          display: 'flex', 
          flex: 1.5, // Reduced from 1.8 to 1.5
          marginBottom: '0.5rem'
        }}>
          {/* MAU Chart */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <h3 style={{ 
              marginBottom: '0.5rem', 
              fontSize: '1rem',
              textAlign: 'center' 
            }}>EOY MAU</h3>
            
            <div style={{ 
              flex: 1,
              position: 'relative',
              padding: '0 10px'
            }}>
              {/* Y-axis labels for MAU chart */}
              <div style={{ 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                bottom: 0, 
                width: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingRight: '5px',
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <div style={{ position: 'absolute', top: '0%', right: '5px' }}>1.5M</div>
                <div style={{ position: 'absolute', top: '33%', right: '5px', marginTop: '-10px' }}>1M</div>
                <div style={{ position: 'absolute', top: '66%', right: '5px', marginTop: '-10px' }}>500K</div>
                <div style={{ position: 'absolute', bottom: '0%', right: '5px', marginBottom: '5px' }}>0</div>
              </div>
              
              {/* Chart area */}
              <div style={{ 
                marginLeft: '40px', 
                height: '100%', 
                display: 'flex',
                alignItems: 'flex-end',
                gap: '10px',
                minHeight: '220px' // Reduced from 280px to 220px
              }}>
                {years.map((year, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      flex: 1, 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <div style={{ position: 'relative', width: '70%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <motion.div
                        initial={{ height: '0%' }}
                        animate={{ height: `${Math.max((users[index] / maxUsers) * 100, 1)}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                        style={{ 
                          width: '100%', 
                          backgroundColor: 'rgba(111, 116, 217, 0.8)', // Blue color for users
                          borderRadius: '4px 4px 0 0'
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                        style={{
                          position: 'absolute',
                          bottom: `${Math.max((users[index] / maxUsers) * 100, 1)}%`,
                          transform: 'translateY(-100%)',
                          width: '100%',
                          textAlign: 'center',
                          fontSize: '0.55rem',
                          color: 'rgba(255, 255, 255, 0.9)',
                          marginBottom: '2px'
                        }}
                      >
                        {formatNumber(users[index])}
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                      style={{ 
                        marginTop: '5px',
                        fontSize: '0.7rem',
                        textAlign: 'center'
                      }}
                    >
                      {year}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Revenue & Costs Chart */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ 
              flex: 2,
              marginLeft: '0.5rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <h3 style={{ 
              marginBottom: '0.5rem', 
              fontSize: '1rem',
              textAlign: 'center'
            }}>Revenue, Costs & Net Profit</h3>
            
            <div style={{ 
              flex: 1,
              position: 'relative',
              padding: '0 10px'
            }}>
              {/* Y-axis labels for Revenue & Costs chart */}
              <div style={{ 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                bottom: 0, 
                width: '50px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingRight: '5px',
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <div style={{ position: 'absolute', top: '15%', right: '5px', marginTop: '-10px' }}>$2M</div>
                <div style={{ position: 'absolute', top: '32%', right: '5px', marginTop: '-10px' }}>$1M</div>
                <div style={{ position: 'absolute', top: '50%', right: '5px', marginTop: '-10px' }}>$0</div>
                <div style={{ position: 'absolute', top: '70%', right: '5px', marginTop: '-10px' }}>-$1M</div>
              </div>

              {/* Horizontal guide lines */}
              <div style={{
                position: 'absolute',
                left: '50px',
                right: '10px',
                top: '15%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                zIndex: 0
              }} />
              <div style={{
                position: 'absolute',
                left: '50px',
                right: '10px',
                top: '32%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                zIndex: 0
              }} />
              <div style={{
                position: 'absolute',
                left: '50px',
                right: '10px',
                top: '50%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                zIndex: 0
              }} />
              <div style={{
                position: 'absolute',
                left: '50px',
                right: '10px',
                top: '70%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                zIndex: 0
              }} />
              
              {/* Chart area */}
              <div style={{ 
                marginLeft: '50px', 
                height: '100%', 
                display: 'flex',
                gap: '25px'
              }}>
                {years.map((year, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      flex: 1, 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      position: 'relative'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      width: '100%', 
                      height: '100%', 
                      justifyContent: 'space-around',
                      position: 'relative'
                    }}>
                      {/* Revenue bar (positive) */}
                      <div style={{ 
                        width: '18%', // Reduced from 20% to 18%
                        height: '50%',
                        position: 'absolute',
                        top: 0,
                        left: '20%', // Adjusted from 18% to 20%
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                      }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max((revenue[index] / maxFinancial) * 100, 1)}%` }}
                          transition={{ duration: 1, delay: 1.0 + index * 0.2 }}
                          style={{ 
                            width: '100%', 
                            backgroundColor: 'var(--jiboni-primary)',
                            borderRadius: '4px 4px 0 0'
                          }}
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                          style={{
                            position: 'absolute',
                            bottom: `${Math.max((revenue[index] / maxFinancial) * 100, 1)}%`,
                            transform: 'translateY(-100%)',
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '0.45rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            marginBottom: '2px'
                          }}
                        >
                          {formatNumber(revenue[index])}
                        </motion.div>
                      </div>
                      
                      {/* Costs bar (negative) */}
                      <div style={{ 
                        width: '18%', // Reduced from 20% to 18%
                        height: '50%',
                        position: 'absolute',
                        top: '50%',
                        left: '41%', // Adjusted from 42% to 41%
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start'
                      }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max((costs[index] / maxFinancial) * 100, 1)}%` }}
                          transition={{ duration: 1, delay: 1.2 + index * 0.2 }}
                          style={{ 
                            width: '100%', 
                            backgroundColor: 'rgba(255, 193, 7, 0.8)', // Changed from red to yellow
                            borderRadius: '0 0 4px 4px'
                          }}
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                          style={{
                            position: 'absolute',
                            top: `${Math.max((costs[index] / maxFinancial) * 100, 1)}%`,
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '0.45rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            marginTop: '2px'
                          }}
                        >
                          -{formatNumber(costs[index])}
                        </motion.div>
                      </div>
                      
                      {/* Net Profit bar */}
                      <div style={{ 
                        width: '18%', // Reduced from 20% to 18%
                        height: '100%', 
                        position: 'absolute',
                        top: 0,
                        right: '20%', // Adjusted from 18% to 20%
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                        {netProfit[index] >= 0 ? (
                          <div style={{ 
                            width: '100%',
                            height: '50%',
                            position: 'absolute',
                            top: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end'
                          }}>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${Math.max((netProfit[index] / maxFinancial) * 100, 1)}%` }}
                              transition={{ duration: 1, delay: 1.4 + index * 0.2 }}
                              style={{ 
                                width: '100%', 
                                backgroundColor: 'rgba(46, 213, 115, 0.8)',
                                borderRadius: '4px 4px 0 0'
                              }}
                            />
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                              style={{
                                position: 'absolute',
                                bottom: `${Math.max((netProfit[index] / maxFinancial) * 100, 1)}%`,
                                transform: 'translateY(-100%)',
                                width: '100%',
                                textAlign: 'center',
                                fontSize: '0.45rem',
                                color: 'rgba(255, 255, 255, 0.9)',
                                marginBottom: '2px'
                              }}
                            >
                              {formatNumber(netProfit[index])}
                            </motion.div>
                          </div>
                        ) : (
                          <div style={{ 
                            width: '100%',
                            height: '50%',
                            position: 'absolute',
                            top: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start'
                          }}>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${Math.max((Math.abs(netProfit[index]) / maxFinancial) * 100, 1)}%` }}
                              transition={{ duration: 1, delay: 1.4 + index * 0.2 }}
                              style={{ 
                                width: '100%', 
                                backgroundColor: 'rgba(46, 213, 115, 0.8)',
                                borderRadius: '0 0 4px 4px'
                              }}
                            />
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                              style={{
                                position: 'absolute',
                                top: `${Math.max((Math.abs(netProfit[index]) / maxFinancial) * 100, 1)}%`,
                                width: '100%',
                                textAlign: 'center',
                                fontSize: '0.45rem',
                                color: 'rgba(255, 255, 255, 0.9)',
                                marginTop: '2px'
                              }}
                            >
                              {formatNumber(netProfit[index])}
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.0 + index * 0.1 }}
                      style={{ 
                        position: 'absolute',
                        bottom: '5px',
                        fontSize: '0.7rem',
                        textAlign: 'center'
                      }}
                    >
                      {year}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              marginTop: '0.25rem',
              fontSize: '0.8rem',
              gap: '15px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center'
              }}>
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  backgroundColor: 'var(--jiboni-primary)', // Purple for revenue
                  marginRight: '5px',
                  borderRadius: '2px'
                }}></div>
                Revenue
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center'
              }}>
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  backgroundColor: 'rgba(255, 193, 7, 0.8)', // Yellow for costs
                  marginRight: '5px',
                  borderRadius: '2px'
                }}></div>
                Costs
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center'
              }}>
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  backgroundColor: 'rgba(46, 213, 115, 0.8)', // Green for profit
                  marginRight: '5px',
                  borderRadius: '2px'
                }}></div>
                Net Profit
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom row with Key Metrics and Notes */}
        <div style={{ 
          display: 'flex', 
          flex: 1,
          gap: '0.5rem',
          minHeight: '180px'
        }}>
          {/* Key Metrics - remove card styling */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ 
              flex: 0.8,
              minWidth: '40%',
              minHeight: '180px',
              padding: '1rem'
              // Removed background, border-radius, box-shadow
            }}
          >
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100% - 10px)',
              justifyContent: 'space-around',
              gap: '4px'
            }}>
              {/* Annual Churn Rate */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                height: '25px'
              }}>
                <div style={{ width: '120px', fontSize: '0.8rem', whiteSpace: 'normal' }}>Annual Churn:</div>
                <div style={{ 
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  {[
                    {year: 'Y1', rate: '0%'},
                    {year: 'Y2', rate: '5%'},
                    {year: 'Y3', rate: '10%'},
                    {year: 'Y4', rate: '15%'},
                    {year: 'Y5', rate: '15%'}
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                      style={{
                        fontSize: '0.7rem',
                        textAlign: 'center',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {`${item.year}: ${item.rate}`}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Premium Conversion - separate line */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                height: '10px'
              }}>
                <div style={{ width: '150px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>Premium Conversion:</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  style={{
                    fontSize: '0.8rem',
                    opacity: 0.8
                  }}
                >
                  3% (>10k users)
                </motion.div>
              </div>
              
              {/* ARPPU - separate line */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                height: '20px'
              }}>
                <div style={{ width: '120px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>ARPPU:</div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '4px',
                    padding: '3px 10px',
                    fontSize: '0.8rem'
                  }}
                >
                  $60/year ($5/month)
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Notes Section - remove card styling */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ 
              flex: 1.8,
              minHeight: '180px',
              padding: '1rem'
              // Removed background, border-radius, box-shadow
            }}
          >
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              height: 'calc(100% - 10px)',
              overflowY: 'visible',
              paddingTop: '5px'
            }}>
              {/* Strategic notes content remains the same */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'flex-start' }}
              >
                <div style={{ 
                  minWidth: '6px', 
                  height: '6px', 
                  backgroundColor: 'var(--jiboni-primary)', 
                  borderRadius: '50%', 
                  marginTop: '5px',
                  marginRight: '8px' 
                }}></div>
                <div style={{ lineHeight: '1.2' }}>Y1: Development focus, no monetization</div>
              </motion.div>
              
              {/* Apply the same style to all other note items */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'flex-start' }}
              >
                <div style={{ 
                  minWidth: '6px', 
                  height: '6px', 
                  backgroundColor: 'var(--jiboni-primary)', 
                  borderRadius: '50%', 
                  marginTop: '5px',
                  marginRight: '8px' 
                }}></div>
                <div style={{ lineHeight: '1.2' }}>Y2: Freemium model introduction with premium features</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'flex-start' }}
              >
                <div style={{ 
                  minWidth: '6px', 
                  height: '6px', 
                  backgroundColor: 'var(--jiboni-primary)', 
                  borderRadius: '50%', 
                  marginTop: '5px',
                  marginRight: '8px' 
                }}></div>
                <div style={{ lineHeight: '1.2' }}>Y3 growth rate higher due to removing beta cap on signups, with significant waiting list expected</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'flex-start' }}
              >
                <div style={{ 
                  minWidth: '6px', 
                  height: '6px', 
                  backgroundColor: 'var(--jiboni-primary)', 
                  borderRadius: '50%', 
                  marginTop: '5px',
                  marginRight: '8px' 
                }}></div>
                <div style={{ lineHeight: '1.2' }}>Low churn due to network stickiness & integrated utility</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'flex-start' }}
              >
                <div style={{ 
                  minWidth: '6px', 
                  height: '6px', 
                  backgroundColor: 'var(--jiboni-primary)', 
                  borderRadius: '50%', 
                  marginTop: '5px',
                  marginRight: '8px' 
                }}></div>
                <div style={{ lineHeight: '1.2' }}>Costs increase with development, monetization & growth investments</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'flex-start' }}
              >
                <div style={{ 
                  minWidth: '6px', 
                  height: '6px', 
                  backgroundColor: 'var(--jiboni-primary)', 
                  borderRadius: '50%', 
                  marginTop: '5px',
                  marginRight: '8px' 
                }}></div>
                <div style={{ lineHeight: '1.2' }}>Profitability projected in Year 4 as scaled growth drives revenue</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default FinancialsSlide;
