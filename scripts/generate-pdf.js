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
      if (slideIndex === 10) { // Changed from 11 to 10 (zero-based index for slide 11)
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
          // Add PDF mode class to body
          document.body.classList.add('pdf-mode');
          
          // Force all animations to complete
          const motionElements = document.querySelectorAll('motion');
          motionElements.forEach(el => {
            if (el.style) {
              el.style.opacity = '1';
              el.style.transform = 'none';
            }
          });
          
          // Ensure slide number is visible
          const slideElement = document.querySelector('.financials-slide');
          if (slideElement) {
            let slideNumber = slideElement.querySelector('.slide-number');
            if (!slideNumber) {
              slideNumber = document.createElement('div');
              slideNumber.className = 'slide-number';
              slideNumber.textContent = '11/13'; // Financials is slide 11 of 13
              slideElement.appendChild(slideNumber);
            }
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
          margin: { top: '0.2cm', right: '0.2cm', bottom: '0.2cm', left: '0.2cm' }, // Extremely reduced margins
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
    slidePdfPaths.splice(10, 0, financialsSlidePath); // Changed from 11 to 10 (zero-based index)

    // Verify we have the correct number of slides
    console.log(`Total slides to merge: ${slidePdfPaths.length}`);
    if (slidePdfPaths.length !== totalSlides) { // Changed from > to !== for more precise check
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
        if (path.includes('special') && slideNum === 10) { // Changed from 11 to 10
          // Check if we've already seen a special financials slide
          if (slideMap.has('special-10')) { // Changed from special-11 to special-10
            console.log(`Removing duplicate special financials slide: ${path}`);
            return false;
          }
          slideMap.set('special-10', true); // Changed from special-11 to special-10
          return true;
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
  const url = `http://localhost:3000/?pdf=true&slide=10`; // Using slide 10 (zero-based index for slide 11)
  console.log(`Loading financials slide: ${url}`);
  
  try {
    await page.goto(url, { 
      waitUntil: ['load', 'networkidle0'], 
      timeout: 60000 
    });
    
    // Wait for any content to load
    console.log('Waiting for page content to load...');
    await page.waitForSelector('body', { timeout: 10000 });
    
    // Add a longer delay to ensure everything is rendered
    console.log('Waiting for additional time to ensure rendering...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Apply PDF mode class and handle animations
    await page.evaluate(() => {
      // Add PDF mode class to body
      document.body.classList.add('pdf-mode');
      
      // Force all animations to complete
      document.querySelectorAll('motion, [class*="motion"]').forEach(el => {
        if (el.style) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.visibility = 'visible';
        }
      });
      
      // Fix chart bars alignment and visibility
      document.querySelectorAll('[style*="height"]').forEach(el => {
        if (el.style) {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        }
      });
      
      // Fix chart container positioning
      document.querySelectorAll('.card > div[style*="position: relative"]').forEach(container => {
        if (container) {
          container.style.height = '280px';
          container.style.minHeight = '280px';
          container.style.position = 'relative';
          container.style.overflow = 'visible';
        }
      });
      
      // Fix chart bars positioning
      document.querySelectorAll('[style*="position: absolute"][style*="top"]').forEach(el => {
        if (el.style && el.style.top) {
          // Ensure percentage values are properly applied
          if (el.style.top.includes('%')) {
            const topValue = el.style.top.replace(/['"]/g, '');
            el.style.top = topValue;
          }
        }
      });
      
      // Fix chart values visibility and positioning with smaller font
      document.querySelectorAll('[style*="fontSize"]').forEach(value => {
        if (value.style) {
          value.style.fontSize = '0.4rem'; // Reduced to 0.4rem
          value.style.opacity = '1';
          value.style.visibility = 'visible';
          value.style.color = 'white';
          value.style.fontWeight = 'bold';
          value.style.textShadow = '0 0 2px rgba(0, 0, 0, 0.8)';
          
          // Add spacing to prevent overlap
          if (value.parentElement) {
            if (value.parentElement.style.top && value.parentElement.style.top.includes('%')) {
              // For negative values (costs)
              const topValue = parseFloat(value.parentElement.style.top.replace(/['"]/g, '').replace('%', ''));
              // Adjust position to prevent overlap
              if (topValue > 45 && topValue < 55) {
                value.parentElement.style.top = (topValue + 5) + '%';
              }
            }
            
            if (value.parentElement.style.bottom && value.parentElement.style.bottom.includes('%')) {
              // For positive values (revenue and profit)
              const bottomValue = parseFloat(value.parentElement.style.bottom.replace(/['"]/g, '').replace('%', ''));
              // Adjust position to prevent overlap
              if (bottomValue > 45 && bottomValue < 55) {
                value.parentElement.style.bottom = (bottomValue + 5) + '%';
              }
            }
          }
        }
      });
      
      // Add specific styles for the financials chart
      const style = document.createElement('style');
      style.textContent = `
        .pdf-mode .card, .pdf-mode [class*="chart"], .pdf-mode [class*="Chart"] {
          overflow: visible !important;
          height: auto !important;
          min-height: 280px !important;
          background-color: rgba(42, 57, 80, 0.8) !important;
        }
        
        .pdf-mode [style*="position: absolute"][style*="top"] {
          position: absolute !important;
        }
        
        .pdf-mode [style*="position: absolute"][style*="bottom"] {
          position: absolute !important;
        }
        
        .pdf-mode [style*="height"][style*="%"] {
          min-height: 5px !important;
          opacity: 1 !important;
          visibility: visible !important;
        }
        
        .pdf-mode [style*="backgroundColor: var(--jiboni-primary)"] {
          background-color: #4568dc !important;
        }
        
        .pdf-mode [style*="backgroundColor: rgba(255, 193, 7, 0.8)"] {
          background-color: rgba(255, 193, 7, 0.9) !important;
        }
        
        .pdf-mode [style*="backgroundColor: rgba(46, 213, 115, 0.8)"] {
          background-color: rgba(46, 213, 115, 0.9) !important;
        }
        
        /* Fix for the 0 axis line alignment */
        .pdf-mode [style*="position: absolute"][style*="top: '50%'"] {
          top: 50% !important;
          transform: translateY(-50%) !important;
        }
        
        /* Reduce font size for chart value labels */
        [style*="fontSize"][style*="0.45rem"],
        [style*="fontSize"][style*="0.55rem"],
        [style*="fontSize"][style*="0.65rem"] {
          font-size: 0.5rem !important;
          color: white !important;
          font-weight: bold !important;
          text-shadow: 0 0 2px rgba(0, 0, 0, 0.8) !important;
        }
        
        /* Target all chart value labels */
        [style*="position: absolute"][style*="top"][style*="%"] [style*="fontSize"],
        [style*="position: absolute"][style*="bottom"][style*="%"] [style*="fontSize"] {
          font-size: 0.5rem !important;
        }
        
        /* Reduce font size for all chart value labels */
        [style*="fontSize"] {
          font-size: 0.4rem;
          color: white;
          font-weight: bold;
          text-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
        }
        
        /* Add spacing between labels to prevent overlap */
        [style*="position: absolute"][style*="top"],
        [style*="position: absolute"][style*="bottom"] {
          margin-top: 2px;
          margin-bottom: 2px;
        }
        
        /* Ensure labels don't overlap with bars */
        [style*="position: absolute"][style*="top"][style*="%"] {
          top: calc(attr(style top) + 5%) !important;
        }
        
        [style*="position: absolute"][style*="bottom"][style*="%"] {
          bottom: calc(attr(style bottom) + 5%) !important;
        }
      `;
      document.head.appendChild(style);
    });
    
    // Increase the wait time to ensure rendering is complete
    await new Promise(resolve => setTimeout(resolve, 8000));

    // Take a screenshot to verify what's being captured
    const screenshotPath = path.join(slidesPdfDir, `slide-10-special.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Use a smaller scale to ensure everything fits
    const slidePdfPath = path.join(slidesPdfDir, `slide-10-special.pdf`); // Changed from 11 to 10
    await page.pdf({
      path: slidePdfPath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0.2cm', right: '0.2cm', bottom: '0.2cm', left: '0.2cm' },
      scale: 0.5, // Reduced scale to fit everything
      pageRanges: '1'
    });
    
    console.log('Financials slide PDF generated successfully');
    return slidePdfPath;
    
  } catch (error) {
    console.error('Error processing financials slide:', error);
    
    // Fallback: Create a simple PDF with text indicating the financials slide
    console.log('Creating fallback PDF for financials slide...');
    
    // Create a blank page with text
    await page.setContent(`
      <html>
        <body style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif; background-color: #1e293b;">
          <div style="text-align: center; color: white;">
            <h1>Financials</h1>
            <p>Slide 11 of 13</p>
            <p style="color: #aaa; margin-top: 20px;">Note: This is a fallback slide due to rendering issues.</p>
          </div>
        </body>
      </html>
    `);
    
    // Generate a fallback PDF
    const fallbackPath = path.join(slidesPdfDir, `slide-10-fallback.pdf`); // Changed from 11 to 10
    await page.pdf({
      path: fallbackPath,
      format: 'A4',
      landscape: true,
      printBackground: true
    });
    
    console.log('Fallback PDF created for financials slide');
    return fallbackPath;
  } finally {
    await page.close();
  }
}

generatePDF();
