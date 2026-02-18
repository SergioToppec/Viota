module.exports = async function handler(req, res) {
  console.log("=== INICIO DE FUNCIÓN ===");
  console.log("Método:", req.method);
  console.log("API Key presente:", !!process.env.OPENAI_API_KEY);
  
  // Solo permitir método POST
  if (req.method !== 'POST') {
    console.log("Método no permitido:", req.method);
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    console.log("Intentando importar OpenAI...");
    const { default: OpenAI } = await import('openai');
    console.log("OpenAI importado exitosamente");
    
    console.log("Creando instancia de OpenAI...");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log("Instancia creada exitosamente");

    const { apuntes } = req.body;
    console.log("Apuntes recibidos:", apuntes?.substring(0, 50));

    if (!apuntes?.trim()) {
      console.log("Apuntes vacíos");
      return res.status(400).json({ error: "El campo 'apuntes' no puede estar vacío." });
    }

    console.log("Llamando a OpenAI API...");
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: "Eres un asistente que genera minutas profesionales en formato markdown. Incluye: Fecha, Objetivo, Participantes, Temas (viñetas), Acuerdos (tabla con responsable y fecha)."
        },
        {
          role: "user",
          content: apuntes,
        },
      ],
    });
    console.log("Respuesta de OpenAI recibida");

    const minuta = completion.choices[0].message.content;
    console.log("=== FIN EXITOSO ===");

    return res.status(200).json({ minuta });

  } catch (error) {
    console.error("=== ERROR ===");
    console.error("Tipo:", error.constructor.name);
    console.error("Mensaje:", error.message);
    console.error("Stack:", error.stack);
    console.error("=== FIN ERROR ===");
    
    return res.status(500).json({ 
      error: "Error al generar la minuta",
      details: error.message,
      type: error.constructor.name
    });
  }
};
