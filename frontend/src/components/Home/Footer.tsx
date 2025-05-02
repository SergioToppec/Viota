export default function Footer() {
    return (
      <footer className="mt-12 border-t border-gray-200 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MinutaExpress - Todos los derechos reservados
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Versión 1.0 · Diseñado para simplificar tus reuniones
          </p>
        </div>
      </footer>
    );
  }