import { useState } from 'react';
import type { TabType, FbProfile, FbBm, FbPage, Card, Phone } from '../types';
import AbasNavegacao from '../components/AbasNavegacao';
import ModernFilterBar from '../components/FilterBar';
import ProfileCard from '../components/ProfileCard';
import BusinessManagerCard from '../components/BusinessManagerCard';
import PageCard from '../components/PageCard';
import CardCard from '../components/CardCard';
import PhoneCard from '../components/PhoneCard';
  import { useFilters } from '../hooks/useFilters';
import { Plus, Database, Download, RefreshCcw } from 'lucide-react';

export default function ModernDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('profiles');

  // ✅ Tipagens genéricas para cada filtro
  const profileFilters = useFilters<FbProfile>({
    data: mockProfiles,
    searchFields: ['name', 'email'],
    statusField: 'status',
    managerField: 'manager',
  });

  const bmFilters = useFilters<FbBm>({
    data: mockBms,
    searchFields: ['name'],
    statusField: 'status',
  });

  const pageFilters = useFilters<FbPage>({
    data: mockPages,
    searchFields: ['name', 'ig_login', 'ig_email'],
    statusField: 'status',
  });

  const cardFilters = useFilters<Card>({
    data: mockCards,
    searchFields: ['name', 'number'],
    statusField: 'status',
  });

  const phoneFilters = useFilters<Phone>({
    data: mockPhones,
    searchFields: ['name', 'number', 'operator'],
    statusField: 'status',
  });

  const getCurrentFilters = () => {
    switch (activeTab) {
      case 'profiles':
        return profileFilters;
      case 'portfolios':
        return bmFilters;
      case 'pages':
        return pageFilters;
      case 'cards':
        return cardFilters;
      case 'phones':
        return phoneFilters;
      default:
        return profileFilters;
    }
  };

  const currentFilters = getCurrentFilters();

  const handleAdd = () => console.log(`Adicionar novo ${activeTab}`);
  const handleExport = () => console.log(`Exportar ${activeTab}`);
  const handleRefresh = () => console.log(`Atualizar ${activeTab}`);

  const renderContent = () => {
    if (currentFilters.filteredData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
          <Database className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum resultado encontrado
          </h3>
          <p className="text-gray-500 mb-4">
            Tente ajustar os filtros ou adicionar novos itens
          </p>
          <Button onClick={handleAdd} className="bg-gradient-to-r from-blue-600 to-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar {mockTabs.find(tab => tab.id === activeTab)?.label}
          </Button>
        </div>
      );
    }

    const gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

    switch (activeTab) {
      case 'profiles':
        return (
          <div className={gridClass}>
            {currentFilters.filteredData.map((profile: FbProfile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onView={(p) => console.log('Ver perfil:', p)}
                onEdit={(p) => console.log('Editar perfil:', p)}
                onCopy={(p) => console.log('Copiar perfil:', p)}
              />
            ))}
          </div>
        );

      case 'portfolios':
        return (
          <div className={gridClass}>
            {currentFilters.filteredData.map((bm: FbBm) => (
              <BusinessManagerCard
                key={bm.id}
                bm={bm}
                onView={(b) => console.log('Ver BM:', b)}
                onEdit={(b) => console.log('Editar BM:', b)}
                onCopy={(b) => console.log('Copiar BM:', b)}
              />
            ))}
          </div>
        );

      case 'pages':
        return (
          <div className={gridClass}>
            {currentFilters.filteredData.map((page: FbPage) => (
              <PageCard
                key={page.id}
                page={page}
                onView={(p) => console.log('Ver página:', p)}
                onEdit={(p) => console.log('Editar página:', p)}
                onCopy={(p) => console.log('Copiar página:', p)}
              />
            ))}
          </div>
        );

      case 'cards':
        return (
          <div className={gridClass}>
            {currentFilters.filteredData.map((card: Card) => (
              <CardCard
                key={card.id}
                card={card}
                onView={(c) => console.log('Ver cartão:', c)}
                onEdit={(c) => console.log('Editar cartão:', c)}
                onCopy={(c) => console.log('Copiar cartão:', c)}
              />
            ))}
          </div>
        );

      case 'phones':
        return (
          <div className={gridClass}>
            {currentFilters.filteredData.map((phone: Phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onView={(p) => console.log('Ver telefone:', p)}
                onEdit={(p) => console.log('Editar telefone:', p)}
                onCopy={(p) => console.log('Copiar telefone:', p)}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 px-6 py-8">
      {/* ✅ Cabeçalho da página */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sistema de Contingências
        </h1>
        <p className="text-gray-600">
          Gerencie perfis, portfólios, páginas, cartões e telefones do Facebook Manager
        </p>
      </div>

      {/* ✅ Abas de navegação */}
      <div className="max-w-7xl mx-auto">
        <AbasNavegacao
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={mockTabs}
        />

        {/* ✅ Botões de ação */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" /> Adicionar
          </Button>

          <Button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" /> Exportar
          </Button>

          <Button
            onClick={handleRefresh}
            className="bg-gray-600 hover:bg-gray-700 text-white"
          >
            <RefreshCcw className="h-4 w-4 mr-2" /> Atualizar
          </Button>
        </div>

        {/* ✅ Filtros */}
        <ModernFilterBar
          filters={currentFilters.filters}
          onFiltersChange={currentFilters.updateFilters}
          totalCount={currentFilters.totalCount}
          filteredCount={currentFilters.filteredCount}
          showManagerFilter={activeTab === 'profiles'}
          managers={mockManagers}
        />

        {/* ✅ Conteúdo dinâmico */}
        {renderContent()}
      </div>
    </div>
  );
}
