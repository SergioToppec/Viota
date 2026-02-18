const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { apuntes } = req.body;

    if (!apuntes?.trim()) {
      return res.status(400).json({ error: "El campo 'apuntes' no puede estar vacío." });
    }

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

    const minuta = completion.choices[0].message.content;

    return res.status(200).json({ minuta });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ 
      error: "Error al generar la minuta. Revisa tu saldo en OpenAI." 
    });
  }
};
