import { Facebook } from 'lucide-react';

export default function Navbar() {
  const menuItems = ['Celulares', 'Gestor', 'Contas Correntes', 'Cartão', 'Perfil', 'Proxy'];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Facebook className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Facebook Manager</h1>
            <p className="text-sm text-gray-500">Controle de Contingências</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-2">
          {menuItems.map((item) => (
            <button
              key={item}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
