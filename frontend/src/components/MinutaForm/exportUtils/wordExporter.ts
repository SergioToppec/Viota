import { Document, Packer, Paragraph, HeadingLevel, Table, TableRow, TableCell, WidthType, TextRun } from "docx";

export const exportToWord = async (minuta: string) => {
  if (!minuta) return;
  
  try {
    const lines = minuta.split('\n');
    const docxContent = [];
    let i = 0;
    
    const isTableStart = (line: string, nextLine: string) => {
      return line.includes('|') && 
             nextLine.includes('|') && 
             !line.startsWith('#') && 
             !line.startsWith('-') &&
             !line.startsWith('**');
    };

    while (i < lines.length) {
      const line = lines[i];
      const nextLine = lines[i + 1] || '';
      
      if (line.startsWith('# ')) {
        docxContent.push(new Paragraph({
          text: line.substring(2).trim(),
          heading: HeadingLevel.HEADING_1,
        }));
        i++;
      } 
      else if (line.startsWith('**') && line.endsWith('**')) {
        docxContent.push(new Paragraph({
          text: line.substring(2, line.length - 2).trim(),
          heading: HeadingLevel.HEADING_2,
        }));
        i++;
      }
      else if (isTableStart(line, nextLine)) {
        // Procesamiento MEJORADO de tablas
        const tableLines = [];
        while (i < lines.length && lines[i].includes('|')) {
          if (!lines[i].trim().match(/^[\|\-\s]+$/)) {
            tableLines.push(lines[i]);
          }
          i++;
        }

        if (tableLines.length >= 2) {
          const headers = tableLines[0].split('|')
            .map(h => h.trim().replace(/\*\*/g, ''))
            .filter(h => h);
          
          const rows = tableLines.slice(1).map(row => {
            const cells = row.split('|')
              .map(cell => cell.trim().replace(/\*\*/g, ''))
              .filter((_, idx) => idx > 0 && idx <= headers.length);
            
            return new TableRow({
              children: cells.map(cell => new TableCell({
                children: [new Paragraph(cell)],
                margins: { top: 100, bottom: 100 }
              }))
            });
          });

          docxContent.push(new Table({
            rows: [
              new TableRow({
                children: headers.map(header => new TableCell({
                  children: [new Paragraph({
                    children: [new TextRun({ text: header, bold: true })]
                  })],
                  shading: { fill: 'DDDDDD' },
                  margins: { top: 100, bottom: 100 }
                }))
              }),
              ...rows
            ],
            width: { size: 100, type: WidthType.PERCENTAGE },
          }));
        }
      }
      else if (line.startsWith('- ')) {
        docxContent.push(new Paragraph({
          text: line.substring(2).trim(),
          bullet: { level: 0 },
        }));
        i++;
      }
      else if (line.trim()) {
        docxContent.push(new Paragraph({
          text: line.trim(),
        }));
        i++;
      }
      else {
        i++;
      }
    }
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: docxContent,
      }],
    });
    
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minuta.docx';
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al generar Word:', error);
    alert('Error al generar el documento Word');
  }
};