import logo from '../../assets/logo-juno.png';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="Logo Juno" 
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-bold text-gray-800 font-sans">
              Ju<span className="text-blue-600">no</span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}