import { useState } from 'react';
import FilterBar from '../components/FilterBar';
import DataTable from '../components/Datatables';
import { useApi } from '../hooks/useApi';
import type { DataItem } from '../types/api';
import { toast } from 'sonner';

type TabType = 'phones' | 'managers' | 'accounts' | 'cards' | 'profiles' | 'proxies';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('profiles');
  
  // Mapeia a aba para o endpoint correspondente
  const getEndpoint = (tab: TabType) => {
    switch (tab) {
      case 'phones': return 'phones';
      case 'managers': return 'managers';
      case 'cards': return 'cards';
      case 'profiles': return 'profiles';
      default: return 'profiles'; // Fallback
    }
  };

  const endpoint = getEndpoint(activeTab);

  const {
    data,
    loading,
    error,
    filters,
    updateFilters,
    totalCount,
    filteredCount,
    refresh,
    create,
    update,
    remove
  } = useApi(endpoint);

  // Ações principais
  const handleAdd = () => {
    toast.info('Funcionalidade de adicionar em desenvolvimento');
  };

  const handleView = (item: DataItem) => {
    toast.info(`Visualizando ${item.name || ('number' in item ? item.number : 'item')}`);
  };

  const handleEdit = (item: DataItem) => {
    toast.info(`Editando ${item.name || ('number' in item ? item.number : 'item')}`);
  };

  const handleDelete = async (item: DataItem) => {
    const itemName = item.name || ('number' in item ? item.number : 'item');
    if (window.confirm(`Tem certeza que deseja excluir ${itemName}?`)) {
      try {
        await remove(item.id);
        toast.success('Item excluído com sucesso');
      } catch (error) {
        toast.error('Erro ao excluir item');
      }
    }
  };

  const getTabTitle = (tab: TabType) => {
    switch (tab) {
      case 'phones': return 'Celulares';
      case 'managers': return 'Gestores';
      case 'accounts': return 'Contas Correntes';
      case 'cards': return 'Cartões';
      case 'profiles': return 'Perfis';
      case 'proxies': return 'Proxies';
      default: return 'Dados';
    }
  };

  // Exibe aviso para abas não implementadas
  if (['accounts', 'proxies'].includes(activeTab)) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {getTabTitle(activeTab)}
          </h2>
          <p className="text-gray-500">
            Esta seção está em desenvolvimento e será implementada em breve.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getTabTitle(activeTab)}
        </h1>
        <p className="text-gray-600">
          Gerencie seus {getTabTitle(activeTab).toLowerCase()} do Facebook Manager
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFiltersChange={updateFilters}
        totalCount={totalCount}
        filteredCount={filteredCount}
        onAdd={handleAdd}
        onRefresh={refresh}
      />

      <DataTable
        data={data}
        loading={loading}
        error={error}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        type={endpoint}
      />
    </main>
  );
}
