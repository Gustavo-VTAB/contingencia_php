import { Smartphone, Eye, Edit, Trash2, CreditCard } from 'lucide-react';
import type { Phone } from '../types';
import StatusBadge from './StatusBadge';

interface PhoneCardProps {
  phone: Phone;
  onView?: (phone: Phone) => void;
  onEdit?: (phone: Phone) => void;
  onDelete?: (phone: Phone) => void;
}

export default function PhoneCard({ phone, onView, onEdit, onDelete }: PhoneCardProps) {
  return (
    <div className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-1.5 p-6 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Smartphone className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{phone.name || 'Celular'}</h3>
              {phone.number && (
                <p className="text-sm text-gray-500">{phone.number}</p>
              )}
            </div>
          </div>
          <StatusBadge status={phone.status} />
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="space-y-2 mb-4">
          {phone.operator && (
            <p className="text-sm text-gray-600">Operadora: {phone.operator}</p>
          )}
          
          {phone.card && (
            <p className="text-sm text-gray-600 flex items-center">
              <CreditCard className="h-3 w-3 mr-2" />
              Cartão: {phone.card.name}
            </p>
          )}

          {phone.easy_at && (
            <p className="text-sm text-gray-600">
              Easy At: {new Date(phone.easy_at).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onView?.(phone)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Eye className="h-3 w-3 mr-1" />
            Ver
          </button>
          <button
            onClick={() => onEdit?.(phone)}
            className="flex items-center px-3 py-1.5 text-sm border border-blue-400 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit className="h-3 w-3 mr-1" />
            Editar
          </button>
          <button
            onClick={() => onDelete?.(phone)}
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