import { Building, Eye, Edit, Trash2, Mail, MessageSquare } from 'lucide-react';
import type { Account } from '../types';
import StatusBadge from './StatusBadge';

interface AccountCardProps {
  account: Account;
  onView?: (account: Account) => void;
  onEdit?: (account: Account) => void;
  onDelete?: (account: Account) => void;
}

export default function AccountCard({ account, onView, onEdit, onDelete }: AccountCardProps) {
  return (
    <div className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-1.5 p-6 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <Building className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{account.name}</h3>
              {account.email && (
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Mail className="h-3 w-3 mr-1" />
                  {account.email}
                </p>
              )}
            </div>
          </div>
          <StatusBadge status={account.status} />
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="space-y-2 mb-4">
          {account.obs && (
            <div className="bg-gray-50 p-2 rounded text-sm text-gray-600 flex items-start">
              <MessageSquare className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
              {account.obs}
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onView?.(account)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Eye className="h-3 w-3 mr-1" />
            Ver
          </button>
          <button
            onClick={() => onEdit?.(account)}
            className="flex items-center px-3 py-1.5 text-sm border border-blue-400 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit className="h-3 w-3 mr-1" />
            Editar
          </button>
          <button
            onClick={() => onDelete?.(account)}
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