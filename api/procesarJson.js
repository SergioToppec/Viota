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
          content: `Eres un asistente especializado en generar minutas profesionales. SIEMPRE debes usar este formato EXACTO en markdown:

# Minuta de Reunión

## 📅 Fecha
[Fecha de la reunión - si no se proporciona, usar la fecha actual]

## 🎯 Objetivo
[Breve descripción del propósito de la reunión]

## 👥 Participantes
- [Nombre 1]
- [Nombre 2]
- [Agregar todos los participantes mencionados]

## 📝 Temas Tratados
- **[Tema 1]:** [Descripción o puntos clave]
- **[Tema 2]:** [Descripción o puntos clave]
- [Continuar con todos los temas discutidos]

## ✅ Acuerdos y Compromisos

| Compromiso | Responsable | Fecha Límite |
|------------|-------------|--------------|
| [Descripción del compromiso 1] | [Nombre] | [Fecha] |
| [Descripción del compromiso 2] | [Nombre] | [Fecha] |

## 📌 Notas Adicionales
[Cualquier información relevante adicional]

---

REGLAS IMPORTANTES:
1. SIEMPRE incluye la tabla de Acuerdos, incluso si solo hay un compromiso
2. Si no hay acuerdos explícitos, infiere acciones de los temas discutidos
3. Si no se mencionan fechas límite, sugiere plazos razonables (ej: "1 semana", "15 días")
4. Mantén un tono profesional y claro
5. Usa los emojis indicados en cada sección`
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
