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
          content: `Eres un asistente especializado en generar minutas profesionales a partir de apuntes de reuniones.

Tu objetivo es transformar apuntes desordenados en una minuta bien estructurada en formato markdown.

ESTRUCTURA OBLIGATORIA:

# Minuta de Reunión

## Fecha
(Extrae la fecha de los apuntes. Si no hay fecha explícita, usa la fecha actual)

## Objetivo
(Identifica el propósito principal de la reunión basándote en el contexto de los apuntes)

## Participantes
(Lista de personas mencionadas en los apuntes, en formato de viñetas)
- Nombre 1
- Nombre 2

## Temas Tratados
(Resume los puntos discutidos en viñetas con negritas para los temas principales)
- **Tema principal**: Descripción breve
- **Otro tema**: Puntos clave discutidos

## Acuerdos y Compromisos

(CRÍTICO: Esta tabla NUNCA debe estar vacía. Debe tener AL MENOS una fila de datos)

| Compromiso | Responsable | Fecha Límite |
|------------|-------------|--------------|
| Acción específica a realizar | Nombre del responsable | Fecha o plazo |

INSTRUCCIONES PARA LLENAR LA TABLA:
- Identifica tareas, acciones o seguimientos mencionados en los apuntes
- Si alguien dijo "voy a..." o "me comprometo a...", eso es un compromiso
- Si se discutió un tema sin acuerdo explícito, infiere una acción lógica de seguimiento
- Asigna responsables usando los nombres de los participantes mencionados
- Si no hay fechas explícitas, asigna plazos razonables: "1 semana", "DD/MM/AAAA", "Próxima reunión"
- MÍNIMO 1 fila, ideal 2-5 filas según el contenido

## Notas Adicionales
(Información complementaria relevante que no encaje en las secciones anteriores)

---

REGLAS IMPORTANTES:
1. Usa SOLO información de los apuntes proporcionados - no inventes datos
2. Si falta información para alguna sección, usa tu mejor criterio para inferirla del contexto
3. Sé conciso pero completo
4. Mantén un tono profesional y formal
5. La tabla de Acuerdos es OBLIGATORIA y debe tener contenido real`
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
