import React from 'react';
import { motion } from 'framer-motion';

function FinancialsSlide() {
  // Financial projections visualization
  const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
  
  // These are placeholder values
  const revenue = [0, 50, 200, 500, 1200];
  const users = [10, 50, 200, 500, 1000]; // in thousands
  
  const maxRevenue = Math.max(...revenue);
  const maxUsers = Math.max(...users);

  return (
    <div className="slide financials-slide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Financial Projections
      </motion.h2>
      
      <div className="flex-container" style={{ marginTop: '2rem', alignItems: 'stretch' }}>
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ flex: 2 }}
        >
          <h3>5-Year Projection</h3>
          
          <div style={{ 
            marginTop: '2rem', 
            height: '250px', 
            position: 'relative',
            padding: '0 10px'
          }}>
            {/* Y-axis labels */}
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
              paddingRight: '10px',
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              <div>$1.2M</div>
              <div>$900K</div>
              <div>$600K</div>
              <div>$300K</div>
              <div>$0</div>
            </div>
            
            {/* Chart area */}
            <div style={{ 
              marginLeft: '40px', 
              height: '100%', 
              display: 'flex',
              alignItems: 'flex-end',
              gap: '20px'
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
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(revenue[index] / maxRevenue) * 100}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                    style={{ 
                      width: '70%', 
                      backgroundColor: 'var(--jiboni-primary)',
                      borderRadius: '4px 4px 0 0'
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                    style={{ 
                      marginTop: '10px',
                      fontSize: '0.8rem',
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
            marginTop: '1rem',
            gap: '20px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: '0.9rem'
            }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: 'var(--jiboni-primary)',
                marginRight: '5px',
                borderRadius: '2px'
              }}></div>
              Revenue
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ flex: 1 }}
        >
          <h3>Key Metrics</h3>
          
          <div style={{ marginTop: '1.5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <h4>User Growth (thousands)</h4>
              <div style={{ 
                marginTop: '0.5rem',
                height: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: 1 }}
                  style={{ 
                    height: '100%',
                    background: 'var(--jiboni-gradient)',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <span>10K</span>
                <span>1M+</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <h4>Conversion Rate</h4>
              <div style={{ 
                marginTop: '0.5rem',
                height: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '40%' }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  style={{ 
                    height: '100%',
                    background: 'var(--jiboni-gradient)',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <span>0%</span>
                <span>5-10%</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <h4>Break-even Point</h4>
              <div style={{ 
                marginTop: '0.5rem',
                height: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1.5, delay: 1.4 }}
                  style={{ 
                    height: '100%',
                    background: 'var(--jiboni-gradient)',
                    borderRadius: '4px'
                  }}
                />
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <span>Year 1</span>
                <span>Year 3</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default FinancialsSlide;
