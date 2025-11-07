import { User, Eye, Edit, Trash2 } from 'lucide-react';
import type { Manager } from '../types';

interface ManagerCardProps {
  manager: Manager;
  onView?: (manager: Manager) => void;
  onEdit?: (manager: Manager) => void;
  onDelete?: (manager: Manager) => void;
}

export default function ManagerCard({ manager, onView, onEdit, onDelete }: ManagerCardProps) {
  return (
    <div className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-1.5 p-6 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <User className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{manager.name}</h3>
              <p className="text-sm text-gray-500">Gestor</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="flex space-x-2">
          <button
            onClick={() => onView?.(manager)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Eye className="h-3 w-3 mr-1" />
            Ver
          </button>
          <button
            onClick={() => onEdit?.(manager)}
            className="flex items-center px-3 py-1.5 text-sm border border-blue-400 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit className="h-3 w-3 mr-1" />
            Editar
          </button>
          <button
            onClick={() => onDelete?.(manager)}
            className="flex items-center px-3 py-1.5 text-sm border border-red-400 text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}