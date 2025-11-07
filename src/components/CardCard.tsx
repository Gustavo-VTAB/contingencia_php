import { CreditCard, Eye, Edit, Trash2, MessageSquare } from 'lucide-react';
import type { Card } from '../types';
import StatusBadge from './StatusBadge';

interface CardCardProps {
  card: Card;
  onView?: (card: Card) => void;
  onEdit?: (card: Card) => void;
  onDelete?: (card: Card) => void;
}

export default function CardCard({ card, onView, onEdit, onDelete }: CardCardProps) {
  return (
    <div className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-1.5 p-6 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <CreditCard className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{card.name}</h3>
              {card.number && (
                <p className="text-sm text-gray-500 font-mono">{card.number}</p>
              )}
            </div>
          </div>
          <StatusBadge status={card.status} />
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="space-y-2 mb-4">
          {card.validity && (
            <p className="text-sm text-gray-600">Validade: {card.validity}</p>
          )}
          
          {card.limit && (
            <p className="text-sm text-gray-600">
              Limite: {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(card.limit)}
            </p>
          )}

          {card.obs && (
            <div className="bg-gray-50 p-2 rounded text-sm text-gray-600 flex items-start">
              <MessageSquare className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
              {card.obs}
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onView?.(card)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Eye className="h-3 w-3 mr-1" />
            Ver
          </button>
          <button
            onClick={() => onEdit?.(card)}
            className="flex items-center px-3 py-1.5 text-sm border border-blue-400 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit className="h-3 w-3 mr-1" />
            Editar
          </button>
          <button
            onClick={() => onDelete?.(card)}
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