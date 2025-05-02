import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de que esté en local.settings.json
});

interface RequestBody {
  apuntes: string;
}

export async function procesarJson(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    const body = (await request.json()) as RequestBody;

    if (!body.apuntes?.trim()) {
      return { status: 400, jsonBody: { error: "El campo 'apuntes' no puede estar vacío." } };
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Modelo económico
      temperature: 0.3,         // Reduce aleatoriedad (resultados más concisos)
      messages: [
        {
          role: "system",
          content: "Eres un asistente que genera minutas profesionales en formato markdown. Incluye: Fecha, Objetivo, Participantes, Temas (viñetas), Acuerdos (tabla con responsable y fecha)."
        },
        {
          role: "user",
          content: body.apuntes,
        },
      ],
    });

    const minuta = completion.choices[0].message.content;

    return { status: 200, jsonBody: { minuta } };

  } catch (error) {
    context.error("Error:", error);
    return { status: 500, jsonBody: { error: "Error al generar la minuta. Revisa tu saldo en OpenAI." } };
  }
}

app.http("procesarJson", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: procesarJson,
});