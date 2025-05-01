
import React from 'react';
import { motion } from 'framer-motion';

function FinancialsSlide() {
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
  const profitRange = Math.max(Math.abs(minProfit), Math.abs(maxProfit));

  // Format numbers for display
  const formatNumber = (num) => {
    if (num === 0) return '0';
    if (Math.abs(num) >= 1000) return `${(num/1000).toFixed(1)}M`;
    return `${num}K`;
  };

  return (
    <div className="slide financials-slide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '0.5rem' }}
      >
        Financial Projections
      </motion.h2>
      
      <div className="flex-container" style={{ 
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 60px)'
      }}>
        {/* Top row with MAU and Revenue/Costs charts */}
        <div style={{ 
          display: 'flex', 
          flex: 3,
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
                gap: '10px'
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
                <div style={{ position: 'absolute', top: '15%', right: '5px' }}>$2M</div>
                <div style={{ position: 'absolute', top: '32%', right: '5px' }}>$1M</div>
                <div style={{ position: 'absolute', top: '50%', right: '5px' }}>$0</div>
                <div style={{ position: 'absolute', top: '70%', right: '5px' }}>-$1M</div>
              </div>

              {/* Horizontal guide lines */}
              <div style={{
                position: 'absolute',
                left: '50px',
                right: '10px',
                top: '15%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                zIndex: 1
              }} />
              <div style={{
                position: 'absolute',
                left: '50px',
                right: '10px',
                top: '32%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                zIndex: 1
              }} />
              <div style={{
                position: 'absolute',
                left: '50px',
                right: '10px',
                top: '50%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                zIndex: 1
              }} />
              <div style={{
                position: 'absolute',
                left: '50px',
                right: '10px',
                top: '70%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                zIndex: 1
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
        
        {/* Bottom row with Key Metrics */}
        <div style={{ 
          display: 'flex', 
          flex: 1
        }}>
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ 
              flex: 1
            }}
          >
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Key Metrics</h3>
            
            {/* Key metrics content - now in 2 columns */}
            <div style={{ 
              display: 'flex',
              flexDirection: 'row',
              height: 'calc(100% - 30px)',
              gap: '15px'
            }}>
              {/* Left column */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {/* User Growth */}
                <div>
                  <div style={{ marginBottom: '0.25rem', fontSize: '0.8rem' }}>User Growth</div>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    height: '16px'
                  }}>
                    <div style={{ width: '35px', fontSize: '0.7rem' }}>10K</div>
                    <div style={{ 
                      flex: 1,
                      height: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 1 }}
                        style={{ 
                          height: '100%',
                          backgroundColor: 'rgba(111, 116, 217, 0.8)',
                          borderRadius: '3px'
                        }}
                      />
                    </div>
                    <div style={{ width: '35px', fontSize: '0.7rem', textAlign: 'right' }}>1.5M</div>
                  </div>
                </div>
                
                {/* Premium Conversion Rate and ARPPU side by side */}
                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  {/* Premium Conversion */}
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '0.25rem', fontSize: '0.8rem' }}>Premium Conversion</div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '30px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '4px',
                      fontSize: '0.9rem'
                    }}>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                      >
                        3% <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>(>10k users)</span>
                      </motion.span>
                    </div>
                  </div>
                  
                  {/* ARPPU */}
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '0.25rem', fontSize: '0.8rem' }}>ARPPU</div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '30px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '4px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                      >
                        $60/year ($5/month)
                      </motion.span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {/* Churn Rate Visualization */}
                <div>
                  <div style={{ marginBottom: '0.25rem', fontSize: '0.8rem' }}>Annual Churn Rate</div>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '30px'
                  }}>
                    {[0, 5, 10, 15, 15].map((rate, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: '18%'
                        }}
                      >
                        <div style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${rate}%`,
                            height: '100%',
                            backgroundColor: 'rgba(255, 193, 7, 0.8)',
                            borderRadius: '3px'
                          }} />
                        </div>
                        <div style={{ fontSize: '0.65rem', marginTop: '2px' }}>
                          {`Y${index+1}: ${rate}%`}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional note at the bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
              style={{
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: '5px',
                textAlign: 'center'
              }}
            >
              Costs increase with development, monetization & growth investments
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default FinancialsSlide;
