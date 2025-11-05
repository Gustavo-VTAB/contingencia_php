import { useState } from "react";

interface FilterBarProps {
  onSearch: (term: string) => void;
}

export default function FilterBar({ onSearch }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("todos");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full md:w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filtro por status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="mt-3 md:mt-0 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="todos">Todos</option>
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>

      {/* Botão de limpar */}
      <button
        onClick={() => {
          setSearchTerm("");
          setStatus("todos");
          onSearch("");
        }}
        className="mt-3 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Limpar
      </button>
    </div>
  );
}
