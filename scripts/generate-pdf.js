// Script to pre-generate PDF during build
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Ensure the public/assets directory exists
const assetsDir = path.join(__dirname, '../public/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

async function generatePDF() {
  console.log('Generating PDF version of the deck...');
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport to match presentation aspect ratio
    await page.setViewport({
      width: 1280,
      height: 720,
      deviceScaleFactor: 2
    });
    
    // Navigate to the local dev server or a production URL
    // For build time, we'll use the local dev server
    const url = process.env.NODE_ENV === 'production' 
      ? 'http://localhost:3000/?pdf=true' 
      : 'http://localhost:3000/?pdf=true';
    
    console.log(`Loading page: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Wait for the page to be fully loaded
    await page.waitForSelector('.slide-container', { timeout: 10000 });
    
    // Add a small delay to ensure animations are complete
    await page.waitForTimeout(2000);
    
    // Get total number of slides
    const totalSlides = await page.evaluate(() => {
      return document.querySelectorAll('.slide').length;
    });
    
    console.log(`Found ${totalSlides} slides to capture`);
    
    // Create PDF with landscape orientation
    const pdfPath = path.join(assetsDir, 'pitch-deck.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0.4cm', right: '0.4cm', bottom: '0.4cm', left: '0.4cm' }
    });
    
    console.log(`PDF generated successfully at: ${pdfPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generatePDF();