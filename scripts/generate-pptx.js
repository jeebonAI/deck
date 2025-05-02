// Script to convert PDF to PowerPoint
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

async function convertPdfToPptx() {
  console.log('Converting PDF to PowerPoint...');
  
  // Define paths
  const assetsDir = path.join(__dirname, '../public/assets');
  const pdfPath = path.join(assetsDir, 'pitch-deck.pdf');
  const pptxPath = path.join(assetsDir, 'pitch-deck.pptx');
  
  // Check if the PDF exists
  if (!fs.existsSync(pdfPath)) {
    console.error(`PDF file not found at: ${pdfPath}`);
    console.log('Please run "pnpm pdf" first to generate the PDF.');
    process.exit(1);
  }
  
  // Try different methods to convert PDF to PPTX
  
  // Method 1: Try using pdf2pptx via pnpm dlx
  try {
    console.log('Trying to convert using pdf2pptx...');
    execSync(`pnpm dlx pdf2pptx@latest ${pdfPath} ${pptxPath}`, { stdio: 'inherit' });
    console.log(`PowerPoint file generated successfully at: ${pptxPath}`);
    return;
  } catch (pdf2pptxError) {
    console.log('pdf2pptx conversion failed, trying alternative method...');
  }
  
  // Method 2: Try using LibreOffice if available
  try {
    console.log('Trying to convert using LibreOffice...');
    execSync('which libreoffice || which soffice');
    execSync(`libreoffice --headless --convert-to pptx --outdir ${assetsDir} ${pdfPath}`, { stdio: 'inherit' });
    
    // LibreOffice might create a file with a different name, so check and rename if needed
    const generatedPptx = path.join(assetsDir, 'pitch-deck.pptx');
    if (fs.existsSync(generatedPptx)) {
      console.log(`PowerPoint file generated successfully at: ${pptxPath}`);
      return;
    } else {
      // Try to find any PPTX file in the directory
      const files = fs.readdirSync(assetsDir);
      const pptxFile = files.find(file => file.endsWith('.pptx'));
      if (pptxFile) {
        fs.moveSync(path.join(assetsDir, pptxFile), pptxPath);
        console.log(`PowerPoint file generated successfully at: ${pptxPath}`);
        return;
      }
    }
  } catch (libreOfficeError) {
    console.log('LibreOffice not found or conversion failed, trying next method...');
  }
  
  // Method 3: Try using node-pptx (a pure JS solution)
  try {
    console.log('Trying to convert using node-pptx...');
    
    // Install node-pptx temporarily using pnpm dlx
    const nodePptxScript = `
      const pptx = require('node-pptx');
      const fs = require('fs');
      
      async function createPptx() {
        const presentation = new pptx.Presentation();
        
        // Get the PDF as base64
        const pdfBase64 = fs.readFileSync('${pdfPath}').toString('base64');
        
        // Create a slide for each page (simplified approach)
        presentation.addSlide((slide) => {
          slide.addImage({ 
            path: '${pdfPath}',
            x: 0, y: 0, w: '100%', h: '100%' 
          });
        });
        
        await presentation.writeFile('${pptxPath}');
        console.log('PPTX created successfully');
      }
      
      createPptx().catch(console.error);
    `;
    
    // Write the script to a temporary file
    const tempScriptPath = path.join(__dirname, 'temp-pptx-script.js');
    fs.writeFileSync(tempScriptPath, nodePptxScript);
    
    // Run the script with pnpm dlx
    execSync(`pnpm dlx node-pptx@latest ${tempScriptPath}`, { stdio: 'inherit' });
    
    // Clean up
    fs.unlinkSync(tempScriptPath);
    
    if (fs.existsSync(pptxPath)) {
      console.log(`PowerPoint file generated successfully at: ${pptxPath}`);
      return;
    }
  } catch (nodePptxError) {
    console.log('node-pptx conversion failed.');
  }
  
  // If all methods fail, provide instructions for manual conversion
  console.log('\nAutomatic conversion to PowerPoint failed. Please try one of these options:');
  console.log('1. Install LibreOffice: sudo apt install -y libreoffice');
  console.log('2. Use an online converter like https://www.adobe.com/acrobat/online/pdf-to-ppt.html');
  console.log(`   Upload the PDF from: ${pdfPath}`);
}

convertPdfToPptx();
