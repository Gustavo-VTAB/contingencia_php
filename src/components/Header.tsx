import { Search, Plus, RefreshCw } from 'lucide-react';
import type { FilterState } from '../types';

interface HeaderProps {
  title: string;
  subtitle: string;
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onAdd: () => void;
  onRefresh: () => void;
  totalCount: number;
  filteredCount: number;
}

export default function Header({
  title,
  subtitle,
  filters,
  onFiltersChange,
  onAdd,
  onRefresh,
  totalCount,
  filteredCount
}: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      {/* Título */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      {/* Barra de Filtros Simples */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Busca */}
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Filtros e Botões */}
        <div className="flex items-center gap-2">
          {/* Filtro de Status */}
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({ status: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">Todos</option>
            <option value="active">Ativo</option>
            <option value="advertising">Anunciando</option>
            <option value="available">Disponível</option>
            <option value="inactive">Inativo</option>
          </select>

          {/* Ordenação */}
          <select
            value={filters.sortBy}
            onChange={(e) => onFiltersChange({ sortBy: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="name">Nome</option>
            <option value="status">Status</option>
            <option value="manager">Gestor</option>
          </select>

          {/* Botões de Ação */}
          <button
            onClick={onRefresh}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </button>
          
          <button
            onClick={onAdd}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </button>
        </div>
      </div>

      {/* Contador */}
      <div className="mt-4 text-sm text-gray-500">
        Mostrando <span className="font-medium">{filteredCount}</span> de <span className="font-medium">{totalCount}</span> registros
      </div>
    </div>
  );
}