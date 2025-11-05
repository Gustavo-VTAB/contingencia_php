interface FilterState {
  search: string;
  status: string;
  sortBy: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (newFilters: Partial<FilterState>) => void;
  totalCount: number;
  filteredCount: number;
  onAdd: () => void;
  onRefresh: () => void | Promise<void>;
}

export default function FilterBar({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
  onAdd,
  onRefresh,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap justify-between items-center bg-white shadow-sm rounded-lg p-4 mb-6">
      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar..."
        value={filters.search}
        onChange={(e) => onFiltersChange({ search: e.target.value })}
        className="border border-gray-300 rounded-md px-3 py-2 w-64"
      />

      {/* Filtros adicionais */}
      <div className="flex items-center space-x-4">
        <select
          value={filters.status}
          onChange={(e) => onFiltersChange({ status: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="all">Todos</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => onFiltersChange({ sortBy: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="name">Nome</option>
          <option value="email">Email</option>
          <option value="number">Número</option>
        </select>

        {/* Botões */}
        <button
          onClick={onRefresh}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg"
        >
          Atualizar
        </button>

        <button
          onClick={onAdd}
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg"
        >
          Adicionar
        </button>
      </div>

      {/* Contador */}
      <div className="text-sm text-gray-500 mt-2 w-full text-right">
        Exibindo {filteredCount} de {totalCount} registros
      </div>
    </div>
  );
}
