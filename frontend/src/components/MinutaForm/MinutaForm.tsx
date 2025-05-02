import { useState } from "react";
import MinutaInput from "./MinutaInput";
import MinutaDisplay from "./MinutaDisplay";
import { generateMinuta } from "../../services/api";

export default function MinutaForm() {
  const [texto, setTexto] = useState("");
  const [minuta, setMinuta] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return alert("⚠️ Debes ingresar apuntes antes de generar la minuta.");

    setCargando(true);
    try {
      const minutaGenerada = await generateMinuta(texto);
      setMinuta(minutaGenerada);
    } catch (error) {
      console.error("Error:", error);
      setMinuta("❌ Error al generar la minuta.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">📝 Generador de Minutas</h1>
      
      <MinutaInput 
        texto={texto}
        setTexto={setTexto}
        cargando={cargando}
        onSubmit={handleSubmit}
      />
      
      {minuta && (
        <MinutaDisplay minuta={minuta} />
      )}
    </div>
  );
}