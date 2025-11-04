import { useState } from 'react';
import AbasNavegacao from '../components/AbasNavegacao';
import type { TabItem } from '../components/AbasNavegacao';
import { Contador } from '../components/ui/Contador';
import type { TabType } from '../types';

const mockTabs: TabItem[] = [
  { id: 'profiles', label: 'Perfis', count: 9 },
  { id: 'portfolios', label: 'Portfólios Empresariais', count: 3 },
  { id: 'pages', label: 'Páginas', count: 1 },
  { id: 'cards', label: 'Cartões', count: 5 },
  { id: 'phones', label: 'Telefones', count: 5 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('profiles');

  const renderContent = () => {
    const tab = mockTabs.find(t => t.id === activeTab);

    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {tab?.label}
        </h3>
        <p className="text-gray-500">
          Conteúdo da aba <span className="font-semibold">{tab?.label}</span>
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ❌ Removido o Navbar duplicado */}

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-4 text-gray-700 font-medium">
          Total de Abas: <Contador count={mockTabs.length} />
        </div>

        <AbasNavegacao
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={mockTabs}
        />

        {renderContent()}
      </main>
    </div>
  );
}
