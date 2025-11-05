import { Eye, Edit, FileText, Instagram, Building2 } from 'lucide-react';
import type { FbPage } from '../types';

interface PageCardProps {
  page: FbPage;
  onView: (page: FbPage) => void;
  onEdit: (page: FbPage) => void;
}

export default function PageCard({ page, onView, onEdit }: PageCardProps) {
  const statusConfig = {
    active: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200' },
    inactive: { label: 'Inativo', className: 'bg-red-100 text-red-800 border-red-200' },
  };

  const statusInfo = statusConfig[page.status as keyof typeof statusConfig] || statusConfig.active;

  return (
    <div className="max-w-sm rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all bg-white/60 backdrop-blur-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-md">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">{page.name}</h3>
            <p className="text-sm text-gray-500">Página do Facebook</p>
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
        {page.ig_login && (
          <div className="flex items-center">
            <Instagram className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium text-gray-600 mr-1">Instagram:</span>
            <span className="text-gray-900">@{page.ig_login}</span>
          </div>
        )}

        {page.ig_email && (
          <div className="flex items-center">
            <span className="font-medium text-gray-600 mr-1">Email IG:</span>
            <span className="text-gray-900 truncate">{page.ig_email}</span>
          </div>
        )}

        {page.bm && (
          <div className="flex items-center">
            <Building2 className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium text-gray-600 mr-1">Business Manager:</span>
            <span className="text-gray-900">{page.bm.name}</span>
          </div>
        )}

        {page.obs && (
          <div className="text-sm">
            <span className="font-medium text-gray-600">Observações:</span>
            <p className="text-gray-700 mt-1 p-2 bg-gray-50 rounded-lg text-xs">{page.obs}</p>
          </div>
        )}
      </div>

      {/* Botões */}
      <div className="flex space-x-2">
        <button
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 rounded-lg shadow transition-all flex items-center justify-center gap-2"
          onClick={() => onView(page)}
        >
          <Eye className="h-4 w-4" />
          Visualizar
        </button>
        <button
          className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
          onClick={() => onEdit(page)}
        >
          <Edit className="h-4 w-4" />
          Editar
        </button>
      </div>
    </div>
  );
}
