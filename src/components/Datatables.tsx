import { Card, CardContent } from './ui/Card';
import { Eye, Edit, Trash2, Loader2, Plus } from 'lucide-react';
import type { DataItem } from '../types/api';

interface DataTableProps {
  data: DataItem[];
  loading: boolean;
  error: string | null;
  onView?: (item: DataItem) => void;
  onEdit?: (item: DataItem) => void;
  onDelete?: (item: DataItem) => void;
  type: 'profiles' | 'managers' | 'cards' | 'phones';
}

const statusConfig = {
  active: { label: 'Ativo', className: 'bg-green-100 text-green-800' },
  inactive: { label: 'Inativo', className: 'bg-red-100 text-red-800' },
};

export default function DataTable({
  data,
  loading,
  error,
  onView,
  onEdit,
  onDelete,
  type,
}: DataTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Carregando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Erro: {error}</p>
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

  const renderItem = (item: DataItem) => {
    const statusInfo = ('status' in item && item.status)
  ? statusConfig[item.status as keyof typeof statusConfig] ?? statusConfig.active
  : statusConfig.active;


    return (
      <Card key={item.id} className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {item.name || ('number' in item ? item.number : 'Sem nome')}
              </h3>
              {type === 'phones' && 'operator' in item && item.operator && (
                <p className="text-sm text-gray-500">Operadora: {item.operator}</p>
              )}
              {type === 'cards' && 'number' in item && item.number && (
                <p className="text-sm text-gray-500 font-mono">{item.number}</p>
              )}
              {type === 'profiles' && 'email' in item && item.email && (
                <p className="text-sm text-gray-500">{item.email}</p>
              )}
            </div>

            <span
              className={`ml-1 px-2 py-0.5 text-xs font-semibold rounded-full ${statusInfo.className}`}
            >
              {statusInfo.label}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            {type === 'cards' && 'validity' in item && (
              <>
                {item.validity && (
                  <p className="text-sm text-gray-600">Validade: {item.validity}</p>
                )}
                {'limit' in item && item.limit && (
                  <p className="text-sm text-gray-600">
                    Limite:{' '}
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(item.limit)}
                  </p>
                )}
              </>
            )}

            {type === 'phones' && (
              <>
                {'card' in item && item.card && (
                  <p className="text-sm text-gray-600">Cartão: {item.card.name}</p>
                )}
                {'easy_at' in item && item.easy_at && (
                  <p className="text-sm text-gray-600">
                    Easy At: {new Date(item.easy_at).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </>
            )}

            {type === 'profiles' && (
              <>
                {'manager' in item && item.manager && (
                  <p className="text-sm text-gray-600">Gestor: {item.manager.name}</p>
                )}
                {'phone_number' in item && item.phone_number && (
                  <p className="text-sm text-gray-600">
                    Telefone: {item.phone_number}
                  </p>
                )}
              </>
            )}

            {'obs' in item && item.obs && (
              <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{item.obs}</p>
            )}
          </div>

          {/* Botões de ação simples */}
          <div className="flex space-x-2">
            {onView && (
              <button
                onClick={() => onView(item)}
                className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                <Eye className="h-4 w-4 mr-2 text-gray-600" />
                Ver
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => onEdit(item)}
                className="flex items-center px-3 py-1.5 text-sm border border-blue-400 text-blue-600 rounded-md hover:bg-blue-50 transition"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(item)}
                className="flex items-center px-3 py-1.5 text-sm border border-red-400 text-red-600 rounded-md hover:bg-red-50 transition"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      {/* Botão de adicionar simples */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => alert('Adicionar novo item!')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Novo
        </button>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(renderItem)}
      </div>
    </div>
  );
}
