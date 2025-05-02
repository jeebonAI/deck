
      const pptx = require('node-pptx');
      const fs = require('fs');
      
      async function createPptx() {
        const presentation = new pptx.Presentation();
        
        // Get the PDF as base64
        const pdfBase64 = fs.readFileSync('/home/nsm/code/jiboni/deck/public/assets/pitch-deck.pdf').toString('base64');
        
        // Create a slide for each page (simplified approach)
        presentation.addSlide((slide) => {
          slide.addImage({ 
            path: '/home/nsm/code/jiboni/deck/public/assets/pitch-deck.pdf',
            x: 0, y: 0, w: '100%', h: '100%' 
          });
        });
        
        await presentation.writeFile('/home/nsm/code/jiboni/deck/public/assets/pitch-deck.pptx');
        console.log('PPTX created successfully');
      }
      
      createPptx().catch(console.error);
    