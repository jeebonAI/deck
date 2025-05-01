import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Import slide components
import TitleSlide from './components/TitleSlide';
import ProblemSlide from './components/ProblemSlide';
import SolutionSlide from './components/SolutionSlide';
import MarketSlide from './components/MarketSlide';
import BusinessModelSlide from './components/BusinessModelSlide';
import GoToMarketSlide from './components/GoToMarketSlide';
import TractionSlide from './components/TractionSlide';
import TeamSlide from './components/TeamSlide';
import FinancialsSlide from './components/FinancialsSlide';
import AskSlide from './components/AskSlide';
import ContactSlide from './components/ContactSlide';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 11; // Based on short-version.md

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  // Render the appropriate slide based on currentSlide
  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return <TitleSlide />;
      case 1:
        return <ProblemSlide />;
      case 2:
        return <SolutionSlide />;
      case 3:
        return <MarketSlide />;
      case 4:
        return <BusinessModelSlide />;
      case 5:
        return <GoToMarketSlide />;
      case 6:
        return <TractionSlide />;
      case 7:
        return <TeamSlide />;
      case 8:
        return <FinancialsSlide />;
      case 9:
        return <AskSlide />;
      case 10:
        return <ContactSlide />;
      default:
        return <TitleSlide />;
    }
  };

  return (
    <div
      className="presentation"
      onClick={nextSlide}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`slide-${currentSlide}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.5
          }}
          className="slide-container"
        >
          {renderSlide()}
        </motion.div>
      </AnimatePresence>

      <div className="navigation">
        <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} title="Previous slide">
          ←
        </button>
        <span>{currentSlide + 1} / {totalSlides}</span>
        <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} title="Next slide">
          →
        </button>
      </div>
    </div>
  );
}

export default App;
