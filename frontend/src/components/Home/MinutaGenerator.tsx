import MinutaForm from '../MinutaForm/MinutaForm';

export default function MinutaGenerator() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Generador de Minutas</h2>
            <p className="text-xl text-gray-600">Comienza a transformar tus reuniones ahora</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl shadow-inner p-6 border border-gray-200">
            <MinutaForm />
          </div>

        </div>
      </div>
    </section>
  );
}