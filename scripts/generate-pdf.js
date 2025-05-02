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
      
      // Create PDF for this slide with adjusted settings
      const slidePdfPath = path.join(slidesPdfDir, `slide-${slideIndex}.pdf`);
      await page.pdf({
        path: slidePdfPath,
        format: 'A4',
        landscape: true,
        printBackground: true,
        margin: { top: '0.4cm', right: '0.4cm', bottom: '0.4cm', left: '0.4cm' },
        scale: 0.85 // Scale down slightly more to ensure all content fits
      });
      
      slidePdfPaths.push(slidePdfPath);
      
      // Close the page to free up memory
      await page.close();
    }
    
    // Merge all slide PDFs into a single PDF
    console.log('Merging slides into a single PDF...');
    const finalPdfPath = path.join(assetsDir, 'pitch-deck.pdf');
    
    // Use pdftk to merge PDFs if available
    try {
      // Check if pdftk is installed
      execSync('which pdftk');
      
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

generatePDF();
