import { Eye, Edit, Building2, Users } from 'lucide-react';
import type { FbBm } from '../types';

interface BusinessManagerCardProps {
  bm: FbBm;
  onView: (bm: FbBm) => void;
  onEdit: (bm: FbBm) => void;
}

export default function BusinessManagerCard({ bm, onView, onEdit }: BusinessManagerCardProps) {
  const statusConfig = {
    active: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200' },
    inactive: { label: 'Inativo', className: 'bg-red-100 text-red-800 border-red-200' },
  };

  const statusInfo = statusConfig[bm.status as keyof typeof statusConfig] || statusConfig.active;

  return (
    <div className="max-w-sm rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all bg-white/60 backdrop-blur-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-md">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">{bm.name}</h3>
            <p className="text-sm text-gray-500">Business Manager</p>
          </div>
        </div>

        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full border ${statusInfo.className}`}
        >
          {statusInfo.label}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-3 mb-6 text-sm text-gray-700">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-gray-400" />
          <span className="font-medium text-gray-600 mr-1">Perfis vinculados:</span>
          <span className="text-gray-900 font-semibold">{bm.profiles_count || 0}</span>
        </div>

        {bm.obs && (
          <div className="text-sm">
            <span className="font-medium text-gray-600">Observações:</span>
            <p className="text-gray-700 mt-1 p-2 bg-gray-50 rounded-lg text-xs">{bm.obs}</p>
          </div>
        )}
      </div>

      {/* Botões */}
      <div className="flex space-x-2">
        <button
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2 rounded-lg shadow transition-all flex items-center justify-center gap-2"
          onClick={() => onView(bm)}
        >
          <Eye className="h-4 w-4" />
          Visualizar
        </button>
        <button
          className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
          onClick={() => onEdit(bm)}
        >
          <Edit className="h-4 w-4" />
          Editar
        </button>
      </div>
    </div>
  );
}
