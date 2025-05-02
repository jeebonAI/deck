// Script to pre-generate PDF during build
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

async function ensureChromium() {
  try {
    // Check if chromium is installed via snap
    execSync('which chromium');
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
  
  // Launch browser with minimal options
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport to match presentation dimensions
    await page.setViewport({
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
    });
    
    // Navigate to the local dev server with PDF mode enabled
    const url = 'http://localhost:3000/?pdf=true';
    console.log(`Loading page: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Wait for the page to be fully loaded
    await page.waitForSelector('.pdf-mode', { timeout: 10000 })
      .catch(() => console.warn('PDF mode selector not found, continuing anyway'));
    
    // Add a small delay to ensure everything is rendered
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
