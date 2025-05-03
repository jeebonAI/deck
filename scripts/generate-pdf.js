// Script to pre-generate PDF during build
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

async function ensureChromium() {
  try {
    // Check if chromium is installed via snap
    execSync('which chromium || which chromium-browser');
    console.log('Chromium is already installed');
  } catch (error) {
    console.log('Installing Chromium via snap...');
    try {
      execSync('sudo snap install chromium', { stdio: 'inherit' });
      console.log('Chromium installed successfully');
    } catch (snapError) {
      console.log('Failed to install via snap, trying apt...');
      try {
        execSync('sudo apt update && sudo apt install -y chromium-browser', { stdio: 'inherit' });
        console.log('Chromium installed successfully via apt');
      } catch (aptError) {
        console.error('Failed to install Chromium. Please install it manually.');
        process.exit(1);
      }
    }
  }
}

async function generatePDF() {
  console.log('Generating PDF version of the deck...');
  
  // Ensure Chromium is installed
  await ensureChromium();
  
  // Make sure the assets directory exists
  const assetsDir = path.join(__dirname, '../public/assets');
  fs.ensureDirSync(assetsDir);
  
  console.log('Launching browser...');
  
  // Try to find Chromium executable
  let executablePath;
  try {
    executablePath = execSync('which chromium || which chromium-browser', { encoding: 'utf-8' }).trim();
    console.log(`Using Chromium at: ${executablePath}`);
  } catch (error) {
    console.log('Could not find Chromium, will use puppeteer default');
  }
  
  // Launch browser with minimal options
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    executablePath: executablePath
  });
  
  try {
    // Create a directory for individual slide PDFs
    const slidesPdfDir = path.join(__dirname, '../temp-slides');
    fs.ensureDirSync(slidesPdfDir);
    
    // Define the total number of slides - make sure this matches App.js
    const totalSlides = 13; // Match the value in App.js
    
    // Array to store paths to individual slide PDFs
    const slidePdfPaths = [];
    
    // Generate PDF for each slide
    for (let slideIndex = 0; slideIndex < totalSlides; slideIndex++) {
      // Skip the financials slide (slide 11) in the main loop as we'll handle it separately
      if (slideIndex === 11) {
        console.log(`Skipping slide ${slideIndex + 1}/${totalSlides} (Financials) in main loop, will handle separately`);
        continue;
      }
      
      console.log(`Processing slide ${slideIndex + 1}/${totalSlides}...`);
      
      // Create a new page for each slide
      const page = await browser.newPage();
      
      await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2, // Higher scaling for sharper rendering
      });
      
      // Navigate to the specific slide with PDF mode enabled
      const url = `http://localhost:3000/?pdf=true&slide=${slideIndex}`;
      console.log(`Loading page: ${url}`);
      
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
      
      // Wait for the page to be fully loaded
      await page.waitForSelector('.slide-container', { timeout: 10000 })
        .catch(() => console.warn('Slide container not found, continuing anyway'));

      // Add a longer delay to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 8000));

      // Force complete all animations before capturing
      await page.evaluate(() => {
        // Force hide all navigation elements
        const elementsToHide = document.querySelectorAll('.navigation-button, .navigation-instructions');
        elementsToHide.forEach(el => {
          if (el) el.style.display = 'none !important';
        });
        
        // Force all animations to complete for all slides
        const motionElements = document.querySelectorAll('motion');
        motionElements.forEach(el => {
          if (el.style) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            // Ensure height is explicitly set for chart bars
            if (el.style.height && el.style.height.includes('%')) {
              const computedHeight = window.getComputedStyle(el).height;
              el.style.height = computedHeight;
              el.style.minHeight = computedHeight;
            }
          }
        });
        
        // Fix for all chart containers and elements with height
        const chartElements = document.querySelectorAll('[style*="height"]');
        chartElements.forEach(el => {
          if (el.style && el.style.height) {
            // Force the height to be explicitly set
            const computedHeight = window.getComputedStyle(el).height;
            el.style.height = computedHeight;
            el.style.minHeight = computedHeight;
          }
        });
        
        // Fix for all chart containers
        const chartContainers = document.querySelectorAll('.card, [class*="chart"], [class*="Chart"]');
        chartContainers.forEach(container => {
          if (container) {
            container.style.overflow = 'visible';
            container.style.height = 'auto';
            container.style.minHeight = '150px';
          }
        });
        
        // Add inline styles to ensure proper rendering for all slides
        const style = document.createElement('style');
        style.textContent = `
          .navigation-button, .navigation-instructions { 
            display: none !important; 
            visibility: hidden !important;
            opacity: 0 !important;
          }
          body { 
            overflow: hidden !important; 
          }
          /* Fix for all charts in PDF mode */
          .card, [class*="chart"], [class*="Chart"] {
            overflow: visible !important;
            height: auto !important;
            min-height: 150px !important;
          }
          motion.div, motion div {
            opacity: 1 !important;
            transform: none !important;
            height: auto !important;
          }
          [style*="height"] {
            min-height: attr(style height) !important;
          }
          /* Ensure all chart bars are visible */
          [style*="height"][style*="%"] {
            min-height: 5px !important;
          }
        `;
        document.head.appendChild(style);
        
        // Add PDF class to body
        document.body.classList.add('pdf-export');
        document.body.classList.add('pdf-mode');
      });
      
      // Take a screenshot to verify what's being captured
      const screenshotPath = path.join(slidesPdfDir, `slide-${slideIndex}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      
      // Special handling for the financials slide (slide 11)
      if (slideIndex === 11) {
        await page.evaluate(() => {
          // Adjust the financials slide specifically
          const financialsSlide = document.querySelector('.financials-slide');
          if (financialsSlide) {
            // Move the slide up to show the title
            financialsSlide.style.marginTop = '-60px';
            
            // Set explicit heights for the slide
            financialsSlide.style.height = 'auto';
            financialsSlide.style.minHeight = '100%';
            financialsSlide.style.paddingBottom = '10px';
            financialsSlide.style.paddingTop = '0';
            
            // Ensure the title is visible
            const title = financialsSlide.querySelector('.title-with-underline');
            if (title) {
              title.style.marginTop = '0';
              title.style.paddingTop = '0';
              title.style.fontSize = '1.8rem';
              title.style.marginBottom = '0.2rem';
            }
            
            // Adjust the flex container
            const flexContainer = financialsSlide.querySelector('.flex-container');
            if (flexContainer) {
              flexContainer.style.height = 'auto';
              flexContainer.style.minHeight = '60%';
              flexContainer.style.gap = '2px';
              flexContainer.style.marginTop = '0.2rem';
            }
            
            // Ensure the bottom row is visible
            const bottomRow = financialsSlide.querySelector('.flex-container > div:last-child');
            if (bottomRow) {
              bottomRow.style.marginBottom = '0';
              bottomRow.style.marginTop = '0.2rem';
              bottomRow.style.flex = 'none';
              bottomRow.style.height = 'auto';
              bottomRow.style.minHeight = '80px';
            }
            
            // Ensure all cards are visible
            const cards = financialsSlide.querySelectorAll('.card');
            cards.forEach(card => {
              card.style.height = 'auto';
              card.style.minHeight = '80px';
              card.style.overflow = 'visible';
              card.style.padding = '0.4rem';
              card.style.margin = '0.1rem';
            });
            
            // Reduce font size for better fit
            const textElements = financialsSlide.querySelectorAll('p, li, div');
            textElements.forEach(el => {
              const currentSize = window.getComputedStyle(el).fontSize;
              const size = parseFloat(currentSize);
              if (size > 7) {
                el.style.fontSize = `${size * 0.7}px`;
              }
            });
            
            // Make charts smaller
            const charts = financialsSlide.querySelectorAll('canvas');
            charts.forEach(chart => {
              chart.style.maxHeight = '120px';
            });
          }
        });
        
        // Wait a bit longer for the financials slide
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create PDF with adjusted settings for financials slide
        const slidePdfPath = path.join(slidesPdfDir, `slide-${slideIndex}.pdf`);
        await page.pdf({
          path: slidePdfPath,
          format: 'A4',
          landscape: true,
          printBackground: true,
          margin: { top: '0.05cm', right: '0.2cm', bottom: '0.2cm', left: '0.2cm' }, // Extremely reduced margins
          scale: 0.55, // Scale down dramatically for financials slide
          pageRanges: '1' // Only capture the first page
        });
        
        slidePdfPaths.push(slidePdfPath);
        
        // Close the page to free up memory
        await page.close();
        
        // Skip to next iteration
        continue;
      }

      // Create PDF with adjusted settings for regular slides
      const slidePdfPath = path.join(slidesPdfDir, `slide-${slideIndex}.pdf`);
      await page.pdf({
        path: slidePdfPath,
        format: 'A4',
        landscape: true,
        printBackground: true,
        margin: { top: '0.4cm', right: '0.4cm', bottom: '0.4cm', left: '0.4cm' },
        scale: 0.85, // Consistent scale for all slides
        pageRanges: '1' // Only capture the first page
      });
      
      slidePdfPaths.push(slidePdfPath);
      
      // Close the page to free up memory
      await page.close();
    }
    
    // After the main loop, handle the financials slide separately
    console.log('Processing financials slide with special handling...');
    const financialsSlidePath = await handleFinancialsSlide(browser, slidesPdfDir);

    // Insert the financials slide PDF at the correct position (11)
    console.log('Inserting financials slide into the PDF sequence');
    slidePdfPaths.splice(11, 0, financialsSlidePath);

    // Verify we have the correct number of slides
    console.log(`Total slides to merge: ${slidePdfPaths.length}`);
    if (slidePdfPaths.length > totalSlides) {
      console.warn(`Warning: Found ${slidePdfPaths.length} slides, expected ${totalSlides}. Removing duplicates...`);
      
      // Create a map to track slide numbers
      const slideMap = new Map();
      
      // Filter out duplicates while preserving order
      const uniqueSlidePaths = slidePdfPaths.filter((path, index) => {
        // Extract slide number from path
        const match = path.match(/slide-(\d+)/);
        if (!match) return true; // Keep if no number found
        
        const slideNum = parseInt(match[1], 10);
        
        // Special case for financials slide
        if (path.includes('special') && slideNum === 11) {
          return true; // Always keep the special financials slide
        }
        
        // Check if we've seen this slide number before
        if (slideMap.has(slideNum)) {
          console.log(`Removing duplicate slide ${slideNum}: ${path}`);
          return false;
        }
        
        // Mark this slide number as seen
        slideMap.set(slideNum, true);
        return true;
      });
      
      // Update the slide paths array
      slidePdfPaths = uniqueSlidePaths;
      console.log(`After removing duplicates: ${slidePdfPaths.length} slides`);
    }
    
    // Merge all slide PDFs into a single PDF
    console.log('Merging slides into a single PDF...');
    const finalPdfPath = path.join(assetsDir, 'pitch-deck.pdf');

    // Use pdftk to merge PDFs if available
    try {
      // Check if pdftk is installed
      execSync('which pdftk');
      
      // Log the slides we're merging to debug
      console.log('Merging the following slides:');
      slidePdfPaths.forEach((path, index) => {
        console.log(`Slide ${index}: ${path}`);
      });
      
      // Merge PDFs using pdftk
      const pdftkCommand = `pdftk ${slidePdfPaths.join(' ')} cat output ${finalPdfPath}`;
      execSync(pdftkCommand);
      
      console.log(`PDF generated successfully at: ${finalPdfPath}`);
    } catch (pdftkError) {
      console.log('pdftk not found, trying alternative method...');
      
      // If pdftk is not available, copy the first PDF and note the limitation
      fs.copyFileSync(slidePdfPaths[0], finalPdfPath);
      console.log(`Limited PDF generated at: ${finalPdfPath} (only first slide)`);
      console.log('To generate a complete PDF with all slides, please install pdftk:');
      console.log('  sudo apt update && sudo apt install -y pdftk');
    }
    
    // Clean up temporary files
    console.log('Cleaning up temporary files...');
    // Uncomment to remove temp files when everything is working
    // fs.removeSync(slidesPdfDir);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Function to handle the financials slide specifically
async function handleFinancialsSlide(browser, slidesPdfDir) {
  console.log('Processing financials slide with special handling...');
  
  const page = await browser.newPage();
  
  // Use the same viewport settings as other slides
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2,
  });
  
  // Navigate to the financials slide with PDF mode enabled
  const url = `http://localhost:3000/?pdf=true&slide=11`;
  console.log(`Loading financials page: ${url}`);
  
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  
  // Wait for the page to be fully loaded
  await page.waitForSelector('.slide-container', { timeout: 10000 })
    .catch(() => console.warn('Slide container not found, continuing anyway'));
  
  // Add a longer delay to ensure everything is rendered
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Apply specific styles for the financials slide content only
  await page.evaluate(() => {
    // Only modify the content inside the slide, not the slide itself
    const style = document.createElement('style');
    style.textContent = `
      /* Target only the content inside the slide */
      .financials-slide .flex-container {
        transform: scale(0.9);
        transform-origin: top center;
        height: 100% !important;
        margin-top: -10px !important;
        gap: 5px !important;
        justify-content: space-between !important;
      }
      
      .financials-slide h1 {
        font-size: 1.8rem !important;
        margin-bottom: 0.2rem !important;
      }
      
      .financials-slide .card {
        padding: 0.4rem !important;
        margin: 0.1rem !important;
      }
      
      .financials-slide h3 {
        font-size: 0.7rem !important;
        margin-bottom: 0.1rem !important;
        margin-top: 0.1rem !important;
      }
      
      .financials-slide p, 
      .financials-slide li, 
      .financials-slide div:not(.card):not(.chart-container):not(.slide-container):not(.slide) {
        font-size: 0.65rem !important;
        line-height: 1 !important;
        margin-bottom: 0.05rem !important;
      }
      
      /* Adjust the flex container to be more compact */
      .financials-slide .flex-container {
        gap: 0.2rem !important;
        height: auto !important;
      }
      
      /* Make bottom row more compact */
      .financials-slide .flex-container > div:last-child {
        margin-top: 0.2rem !important;
        margin-bottom: 0 !important;
      }
      
      /* Make charts more compact */
      .financials-slide .chart-container {
        height: auto !important;
        min-height: 100px !important;
        max-height: 120px !important;
      }
      
      /* Reduce spacing in the key metrics section */
      .financials-slide .key-metrics div {
        gap: 2px !important;
        height: 18px !important;
      }
      
      /* Make all charts smaller */
      .financials-slide canvas {
        max-height: 120px !important;
      }
      
      /* Specifically target chart bars to make them much shorter */
      .financials-slide .card:first-child motion.div[style*="height"] {
        height: 15% !important; /* MAU bars much smaller */
        max-height: 20px !important;
      }

      .financials-slide .card:nth-child(2) motion.div[style*="height"] {
        height: 35% !important; /* Revenue bars slightly larger */
        max-height: 30px !important;
      }

      /* Make the chart containers taller */
      .financials-slide .card > div[style*="position: relative"] {
        height: 150px !important;
        max-height: 150px !important;
      }
      
      /* Hide navigation elements */
      .navigation-button, .navigation-instructions { 
        display: none !important; 
        visibility: hidden !important;
        opacity: 0 !important;
      }
    `;
    document.head.appendChild(style);
    
    // Force all animations to complete
    const motionElements = document.querySelectorAll('motion');
    motionElements.forEach(el => {
      if (el.style) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
    
    // Specifically target and reduce the height of chart bars
    const chartBars = document.querySelectorAll('.financials-slide motion.div[style*="height"]');
    chartBars.forEach(bar => {
      // Drastically reduce the height of all bars
      const currentHeight = window.getComputedStyle(bar).height;
      const heightValue = parseFloat(currentHeight);
      if (!isNaN(heightValue)) {
        // Make bars much shorter - reduce to 30% of original height
        bar.style.height = `${Math.max(heightValue * 0.3, 5)}px`;
        bar.style.maxHeight = '30px';
      }
    });
    
    // Ensure all cards are visible but compact
    const cards = document.querySelectorAll('.financials-slide .card');
    cards.forEach(card => {
      card.style.height = 'auto';
      card.style.minHeight = '80px';
      card.style.overflow = 'visible';
      card.style.padding = '0.4rem';
      card.style.margin = '0.1rem';
    });
    
    // Reduce font size for better fit
    const textElements = document.querySelectorAll('.financials-slide p, .financials-slide li, .financials-slide div:not(.slide):not(.slide-container)');
    textElements.forEach(el => {
      const currentSize = window.getComputedStyle(el).fontSize;
      const size = parseFloat(currentSize);
      if (size > 7) {
        el.style.fontSize = `${size * 0.7}px`;
      }
    });
    
    // Make chart containers shorter
    const chartContainers = document.querySelectorAll('.financials-slide .card > div[style*="position: relative"]');
    chartContainers.forEach(container => {
      container.style.height = '120px';
      container.style.maxHeight = '120px';
    });
  });
  
  // Take a screenshot to verify what's being captured
  const screenshotPath = path.join(slidesPdfDir, `slide-11-special.png`);
  await page.screenshot({ path: screenshotPath });
  
  // Create PDF with the same settings as other slides, just with a slightly smaller scale
  const slidePdfPath = path.join(slidesPdfDir, `slide-11-special.pdf`);
  await page.pdf({
    path: slidePdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: '0.4cm', right: '0.4cm', bottom: '0.4cm', left: '0.4cm' },
    scale: 0.8, // Use a consistent scale with other slides
    pageRanges: '1'
  });
  
  await page.close();
  
  return slidePdfPath;
}

generatePDF();
