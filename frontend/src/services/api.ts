export const generateMinuta = async (apuntes: string): Promise<string> => {
  try {
    const response = await fetch(import.meta.env.VITE_MINUTA_API_URL || "/api/procesarJson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apuntes }),
    });

    const data = await response.json();
    if (response.ok) {
      return data.minuta;
    } else {
      console.error(data);
      return "Error del servidor al generar la minuta.";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Error al conectar con el servidor.";
  }
};