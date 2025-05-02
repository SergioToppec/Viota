import { FormEvent } from "react";

interface MinutaInputProps {
  texto: string;
  setTexto: (text: string) => void;
  cargando: boolean;
  onSubmit: (e: FormEvent) => void;
}

export default function MinutaInput({ texto, setTexto, cargando, onSubmit }: MinutaInputProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mb-8">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        rows={6}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Pega aquí los apuntes de la reunión..."
      />
      <button
        type="submit"
        disabled={cargando}
        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition flex items-center justify-center"
      >
        {cargando ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generando...
          </>
        ) : (
          "Generar Minuta"
        )}
      </button>
    </form>
  );
}