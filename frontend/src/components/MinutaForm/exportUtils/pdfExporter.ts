import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const exportToPDF = async (minuta: string) => {
  if (!minuta) return;
  
  try {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const margin = 50;
    let yPosition = page.getHeight() - margin;
    const baseFontSize = 12;
    const sectionSpacing = 15;
    const paragraphSpacing = 10;

    const calculateTextHeight = (text: string, fontSize: number, maxWidth: number) => {
      const words = text.split(' ');
      let lines = 1;
      let currentLineLength = 0;
      
      words.forEach(word => {
        const wordWidth = font.widthOfTextAtSize(word + ' ', fontSize);
        if (currentLineLength + wordWidth > maxWidth) {
          lines++;
          currentLineLength = wordWidth;
        } else {
          currentLineLength += wordWidth;
        }
      });
      
      return lines * (fontSize * 1.4);
    };

    const addTextSection = (text: string, options: {
      x?: number;
      y?: number;
      isBold?: boolean;
      fontSize?: number;
      isTitle?: boolean;
      isSubtitle?: boolean;
      maxWidth?: number;
    } = {}) => {
      const {
        x = margin,
        y = yPosition,
        isBold = false,
        fontSize = baseFontSize,
        isTitle = false,
        isSubtitle = false,
        maxWidth = page.getWidth() - margin * 2
      } = options;

      const cleanText = text
        .replace(/^#+\s*/g, '')
        .replace(/\*\*/g, '')
        .trim();

      if (!cleanText) return y;

      const effectiveFontSize = isTitle ? fontSize + 6 : isSubtitle ? fontSize + 2 : fontSize;
      const textFont = isBold || isTitle || isSubtitle ? boldFont : font;
      const heightNeeded = calculateTextHeight(cleanText, effectiveFontSize, maxWidth);

      if (y - heightNeeded < margin + 40) {
        page = pdfDoc.addPage([595, 842]);
        yPosition = page.getHeight() - margin;
        return addTextSection(text, { ...options, y: yPosition });
      }

      page.drawText(cleanText, {
        x,
        y: y - (isTitle ? 0 : effectiveFontSize),
        size: effectiveFontSize,
        font: textFont,
        color: rgb(0, 0, 0),
        maxWidth,
        lineHeight: effectiveFontSize * 1.4,
      });

      const spaceAfter = isTitle ? sectionSpacing * 2 : 
                        isSubtitle ? sectionSpacing : 
                        paragraphSpacing;

      return y - (heightNeeded + spaceAfter);
    };

    const addTable = (rows: string[][], headers: string[]) => {
      const tableMargin = margin;
      const tableWidth = page.getWidth() - tableMargin * 2;
      const columnCount = headers.length;
      
      const columnWidths = headers.map((_, colIndex) => {
        const allContent = [headers[colIndex], ...rows.map(row => row[colIndex] || '')];
        const maxWidth = Math.max(...allContent.map(text => 
          font.widthOfTextAtSize(text, baseFontSize - 1)
        ));
        return Math.min(maxWidth + 20, tableWidth / columnCount);
      });

      const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);
      const scaleFactor = tableWidth / totalWidth;
      const adjustedWidths = columnWidths.map(w => w * scaleFactor);

      const calculateRowHeight = (row: string[]) => {
        let maxLines = 1;
        
        row.forEach((cell, colIndex) => {
          if (!cell) return;
          
          const words = cell.split(' ');
          let currentLineLength = 0;
          let cellLines = 1;
          
          words.forEach(word => {
            const wordWidth = font.widthOfTextAtSize(word + ' ', baseFontSize - 1);
            if (currentLineLength + wordWidth > adjustedWidths[colIndex] - 10) {
              cellLines++;
              currentLineLength = wordWidth;
            } else {
              currentLineLength += wordWidth;
            }
          });
          
          if (cellLines > maxLines) maxLines = cellLines;
        });
        
        return baseFontSize + (maxLines * baseFontSize * 1.4);
      };

      const headerHeight = 25;
      const rowHeights = rows.map(calculateRowHeight);
      const tableHeight = headerHeight + rowHeights.reduce((sum, h) => sum + h, 0);
      
      if (yPosition - tableHeight < margin + 40) {
        page = pdfDoc.addPage([595, 842]);
        yPosition = page.getHeight() - margin;
      }

      let currentX = tableMargin;
      headers.forEach((header, colIndex) => {
        page.drawRectangle({
          x: currentX,
          y: yPosition - headerHeight,
          width: adjustedWidths[colIndex],
          height: headerHeight,
          color: rgb(0.95, 0.95, 0.95),
          borderColor: rgb(0, 0, 0),
          borderWidth: 0.5,
        });
        
        const text = header.replace(/\*\*/g, '');
        const textWidth = boldFont.widthOfTextAtSize(text, baseFontSize);
        page.drawText(text, {
          x: currentX + (adjustedWidths[colIndex] - textWidth) / 2,
          y: yPosition - headerHeight + 8,
          size: baseFontSize,
          font: boldFont,
        });
        
        currentX += adjustedWidths[colIndex];
      });

      yPosition -= headerHeight;

      // NUEVO ALGORITMO MEJORADO PARA WRAP DE TEXTO
      rows.forEach((row, rowIndex) => {
        const rowHeight = rowHeights[rowIndex];
        currentX = tableMargin;
        
        row.forEach((cell, colIndex) => {
          const cellText = (cell || '').replace(/\*\*/g, '');
          
          page.drawRectangle({
            x: currentX,
            y: yPosition - rowHeight,
            width: adjustedWidths[colIndex],
            height: rowHeight,
            borderColor: rgb(0.7, 0.7, 0.7),
            borderWidth: 0.3,
          });
          
          if (cellText) {
            const maxWidth = adjustedWidths[colIndex] - 10;
            const lineHeightPx = baseFontSize * 1.4;
            const startY = yPosition - baseFontSize - 4;
            
            const lines = [];
            let remainingText = cellText;
            
            while (remainingText) {
              let fittingLength = remainingText.length;
              let fittingText = remainingText;
              let textWidth = font.widthOfTextAtSize(fittingText, baseFontSize - 1);
              
              while (textWidth > maxWidth && fittingLength > 0) {
                fittingLength--;
                fittingText = remainingText.substring(0, fittingLength);
                textWidth = font.widthOfTextAtSize(fittingText, baseFontSize - 1);
                
                if (textWidth > maxWidth) {
                  const lastSpace = fittingText.lastIndexOf(' ');
                  if (lastSpace > 0) {
                    fittingLength = lastSpace;
                    fittingText = remainingText.substring(0, fittingLength);
                    textWidth = font.widthOfTextAtSize(fittingText, baseFontSize - 1);
                  }
                }
              }
              
              if (fittingLength === 0) {
                fittingLength = Math.floor(maxWidth / (baseFontSize - 1) * 0.6);
                fittingText = remainingText.substring(0, fittingLength);
              }
              
              lines.push(fittingText.trim());
              remainingText = remainingText.substring(fittingLength).trim();
            }
            
            // Dibujar líneas en orden correcto (primera línea arriba)
            lines.forEach((line, lineIndex) => {
              page.drawText(line, {
                x: currentX + 5,
                y: startY - (lineIndex * lineHeightPx),
                size: baseFontSize - 1,
                font: font,
                maxWidth: adjustedWidths[colIndex] - 10,
              });
            });
          }
          
          currentX += adjustedWidths[colIndex];
        });
        
        yPosition -= rowHeight;
      });
      
      return yPosition - sectionSpacing;
    };

    const lines = minuta.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const nextLine = lines[i + 1] || '';

      if (line.startsWith('# ')) {
        yPosition = addTextSection(line, { isTitle: true, fontSize: 16 });
      } 
      else if (line.startsWith('**') && line.endsWith('**')) {
        yPosition = addTextSection(line, { isSubtitle: true, fontSize: 14 });
      }
      else if (line.includes('|') && nextLine.includes('|')) {
        const tableLines = [];
        while (i < lines.length && lines[i].includes('|')) {
          if (!lines[i].trim().match(/^[\|\-\s]+$/)) {
            tableLines.push(lines[i]);
          }
          i++;
        }

        if (tableLines.length >= 2) {
          const headers = tableLines[0].split('|')
            .map(h => h.trim())
            .filter(h => h);
          
          const rows = tableLines.slice(1)
            .map(row => row.split('|')
              .map(cell => cell.trim())
              .filter((_, idx) => idx > 0 && idx <= headers.length)
            )
            .filter(row => row.some(cell => cell));
          
          if (headers.length > 0 && rows.length > 0) {
            yPosition = addTable(rows, headers);
          }
        }
        i--;
      }
      else if (line.startsWith('- ')) {
        yPosition = addTextSection(`• ${line.substring(2)}`, { 
          x: margin + 15,
          maxWidth: page.getWidth() - margin * 2 - 15
        });
      }
      else if (line.trim()) {
        yPosition = addTextSection(line, { 
          maxWidth: page.getWidth() - margin * 2 
        });
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minuta.pdf';
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al generar PDF:', error);
    alert('Error al generar el PDF. Por favor intente nuevamente.');
  }
};