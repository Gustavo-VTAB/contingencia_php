import { useState } from 'react';
import { toast } from 'sonner';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import ManagerCard from '../components/ManagerCard';
import CardCard from '../components/CardCard';
import PhoneCard from '../components/PhoneCard';
import AccountCard from '../components/AccountCard';
import ProxyCard from '../components/ProxyCard';
import { useData } from '../hooks/useData';
import { api } from '../services/api';
import type { TabType, Profile, Manager, Card, Phone, Account, Proxy } from '../types';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('profiles');
  
  const {
    data,
    loading,
    error,
    filters,
    updateFilters,
    totalCount,
    filteredCount,
    refresh
  } = useData(activeTab);

  const sidebarCounts = {
    profiles: api.getProfilesCount().total,
    managers: api.getManagersCount(),
    cards: api.getCardsCount(),
    phones: api.getPhonesCount(),
    accounts: api.getAccountsCount(),
    proxies: api.getProxiesCount(),
  };

  const handleAdd = () => {
    const tabNames = {
      profiles: 'perfil',
      managers: 'gestor',
      cards: 'cartão',
      phones: 'celular',
      accounts: 'conta',
      proxies: 'proxy'
    };
    toast.info(`Funcionalidade de adicionar ${tabNames[activeTab]} em desenvolvimento`);
  };

  const handleView = (item: any) => {
    toast.info(`Visualizando: ${item.name}`);
  };

  const handleEdit = (item: any) => {
    toast.info(`Editando: ${item.name}`);
  };

  const handleDelete = async (item: any) => {
    if (window.confirm(`Tem certeza que deseja excluir "${item.name}"?`)) {
      try {
        await api.delete(activeTab, item.id);
        toast.success(`"${item.name}" excluído com sucesso`);
        refresh();
      } catch (error: any) {
        toast.error(error.message || 'Erro ao excluir');
      }
    }
  };

  const getTabTitle = (tab: TabType) => {
    switch (tab) {
      case 'profiles': return 'Perfis';
      case 'managers': return 'Gestores';
      case 'cards': return 'Cartões';
      case 'phones': return 'Celulares';
      case 'accounts': return 'Contas';
      case 'proxies': return 'Proxies';
      default: return 'Dados';
    }
  };

  const renderCards = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erro: {error}</p>
            <button 
              onClick={refresh}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum item encontrado</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => {
          switch (activeTab) {
            case 'profiles':
              return (
                <ProfileCard
                  key={item.id}
                  profile={item as Profile}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            case 'managers':
              return (
                <ManagerCard
                  key={item.id}
                  manager={item as Manager}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            case 'cards':
              return (
                <CardCard
                  key={item.id}
                  card={item as Card}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            case 'phones':
              return (
                <PhoneCard
                  key={item.id}
                  phone={item as Phone}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            case 'accounts':
              return (
                <AccountCard
                  key={item.id}
                  account={item as Account}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            case 'proxies':
              return (
                <ProxyCard
                  key={item.id}
                  proxy={item as Proxy}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={sidebarCounts}
      />
      
      <div className="flex-1 overflow-auto">
        <Header
          title={getTabTitle(activeTab)}
          subtitle={`Gerencie seus ${getTabTitle(activeTab).toLowerCase()} do Facebook Manager`}
          filters={filters}
          onFiltersChange={updateFilters}
          onAdd={handleAdd}
          onRefresh={refresh}
          totalCount={totalCount}
          filteredCount={filteredCount}
        />

        <div className="p-6">
          {renderCards()}
        </div>
      </div>
    </div>
  );
}