export const formatMinutaText = (text: string) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    const elements = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
  
      // Limpiar títulos (removiendo # y **)
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-2xl font-bold text-gray-800 mb-4">
            {line.substring(2).replace(/\*\*/g, '')}
          </h1>
        );
        continue;
      }
      
      if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <h2 key={i} className="text-lg font-semibold text-gray-700 mt-6 mb-3">
            {line.substring(2, line.length - 2)}
          </h2>
        );
        continue;
      }
      
      if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className="ml-5 list-disc text-gray-700 my-1">
            {line.substring(2)}
          </li>
        );
        continue;
      }
      
      if (line.includes('|') && !line.startsWith('#') && !line.startsWith('-')) {
        const tableLines = [];
        let j = i;
        
        while (j < lines.length && lines[j].includes('|')) {
          if (!lines[j].trim().match(/^[\|\-\s]+$/)) {
            tableLines.push(lines[j]);
          }
          j++;
        }
        
        if (tableLines.length >= 2) {
          const headers = tableLines[0].split('|').map(h => h.trim()).filter(h => h);
          const rows = tableLines.slice(2).map(row => 
            row.split('|').map(cell => cell.trim()).filter((_, idx) => idx > 0 && idx < headers.length + 1)
          );
          
          elements.push(
            <div key={i} className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    {headers.map((header, idx) => (
                      <th 
                        key={idx}
                        className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300"
                      >
                        {header.replace(/\*\*/g, '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIdx) => (
                    <tr 
                      key={rowIdx}
                      className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      {row.map((cell, cellIdx) => (
                        <td 
                          key={cellIdx}
                          className="px-4 py-2 text-sm text-gray-700 border border-gray-300"
                        >
                          {cell.replace(/\*\*/g, '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          
          i = j - 1;
          continue;
        }
      }
      
      if (line.trim() === '') {
        elements.push(<br key={i} />);
        continue;
      }
      
      elements.push(
        <p key={i} className="text-gray-700 mb-3">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    }
    
    return elements;
  };