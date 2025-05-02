export default function ExampleSection() {
    const exampleText = `Apuntes de minuta
  24/04/2025
  
  Ana: Bueno, gracias por conectarse. Esta reunión es para definir cómo podríamos
  integrar herramientas de inteligencia artificial en tareas operativas, especialmente
  en la generación de minutas, que nos quita mucho tiempo cada semana.
  
  Sergio: Sí, eso es clave. Si podemos lograr que una IA escuche el audio de una
  reunión y nos dé al menos un borrador decente, ya ganaríamos bastante tiempo.
  
  Alejandro: Hay opciones interesantes. OpenAI tiene un modelo llamado Whisper
  que transcribe audios, y se puede conectar con ChatGPT para resumir. Incluso
  podríamos usar Microsoft Word online, que tiene función de transcripción.
  
  Laura: Yo solo pediría que el resultado sea entendible. A veces el problema no es
  transcribir, sino que queda todo desordenado y hay que editar demasiado.
  
  Becario IA: Yo podría probar varios flujos, por ejemplo:
  1. Grabar el audio con el celular
  2. Usar una plataforma como Otter.ai o Whisper para transcribir
  3. Pasarlo a ChatGPT para generar un resumen con secciones como
  acuerdos, responsables, fechas, etc.
  4. Exportarlo en formato Word o PDF
  
  Ana: Perfecto, eso justo es lo que necesitamos. Te paso una minuta real y un
  audio para que tomes como ejemplo.
  
  Sergio: Me gustaría que esto lo tengamos como prueba la próxima semana. ¿Te
  parece bien entregar algo para el lunes 29?
  
  Becario IA: Sí, me organizo para entregar una prueba funcional.`;
  
    const handleCopy = () => {
      navigator.clipboard.writeText(exampleText);
      // Aquí podrías agregar un toast de confirmación
    };
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ejemplo de Minuta Conversacional</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prueba con este diálogo realista para ver cómo Juno transforma conversaciones en minutas estructuradas
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Formato de Entrada</h3>
              <button 
                onClick={handleCopy}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copiar Texto
              </button>
            </div>
            <div className="px-6 py-4">
              <pre className="text-gray-800 font-mono text-sm whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
                {exampleText}
              </pre>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 text-sm text-gray-600">
              <svg className="inline-flex w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Juno identificará automáticamente participantes, fechas, acuerdos y puntos clave
            </div>
          </div>
  
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Resultado Esperado</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Al procesar este ejemplo, Juno generará:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Encabezado con fecha y participantes identificados</li>
                    <li>Sección de "Contexto/Objetivo" con el propósito de la reunión</li>
                    <li>Puntos discutidos organizados temáticamente</li>
                    <li>Acuerdos claros con responsables y fechas</li>
                    <li>Próximos pasos accionables</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }