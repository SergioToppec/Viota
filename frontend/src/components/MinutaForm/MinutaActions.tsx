import { useState } from "react";
import { exportToPDF } from "./exportUtils/pdfExporter";
import { exportToWord } from "./exportUtils/wordExporter";

interface MinutaActionsProps {
  minuta: string;
}

export default function MinutaActions({ minuta }: MinutaActionsProps) {
  const [copiado, setCopiado] = useState(false);

  const copiarMinuta = () => {
    if (!minuta) return;
    navigator.clipboard.writeText(minuta).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1500);
    });
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">Minuta Generada</h2>
      <div className="flex space-x-2">
        <button
          onClick={copiarMinuta}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition px-3 py-1 bg-blue-50 rounded"
        >
          {copiado ? (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copiado
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copiar
            </>
          )}
        </button>
        <button
          onClick={() => exportToPDF(minuta)}
          className="flex items-center text-sm text-red-600 hover:text-red-800 transition px-3 py-1 bg-red-50 rounded"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          PDF
        </button>
        <button
          onClick={() => exportToWord(minuta)}
          className="flex items-center text-sm text-green-600 hover:text-green-800 transition px-3 py-1 bg-green-50 rounded"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Word
        </button>
      </div>
    </div>
  );
}