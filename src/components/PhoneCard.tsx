import { Contador } from '../components/ui/Contador';
import type { Phone as PhoneType } from '../types';
import { Eye, Edit, Phone, Smartphone, CreditCard, Calendar, Copy, Trash2 } from 'lucide-react';

interface PhoneCardProps {
  phone: PhoneType;
  onView: (phone: PhoneType) => void;
  onEdit: (phone: PhoneType) => void;
  onCopy?: (phone: PhoneType) => void;
  onDelete?: (phone: PhoneType) => void;
}

const statusConfig = {
  active: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200' },
  inactive: { label: 'Inativo', className: 'bg-red-100 text-red-800 border-red-200' }
};

const operatorColors = {
  'Vivo': 'from-purple-500 to-purple-600',
  'Claro': 'from-red-500 to-red-600',
  'Tim': 'from-blue-500 to-blue-600',
  'Oi': 'from-yellow-500 to-yellow-600',
  'default': 'from-gray-500 to-gray-600'
};

export default function PhoneCard({ phone, onView, onEdit, onCopy, onDelete }: PhoneCardProps) {
  const statusInfo = statusConfig[phone.status as keyof typeof statusConfig] || statusConfig.active;
  const operatorColor = operatorColors[phone.operator as keyof typeof operatorColors] || operatorColors.default;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="group hover:shadow-xl transition-all duration-300 border border-gray-200/50 hover:border-gray-300/50 bg-white/50 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`h-12 w-12 bg-gradient-to-br ${operatorColor} rounded-xl flex items-center justify-center shadow-lg`}>
            <Smartphone className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">{phone.name || 'Telefone'}</h3>
            <p className="text-sm text-gray-500 font-mono">{phone.number}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Contador count={statusInfo.label} active={phone.status === 'active'}/>

          {/* Botões simples no lugar do dropdown */}
          <div className="flex space-x-2">
            <button
              onClick={() => onView(phone)}
              className="flex items-center px-2 py-1 text-sm text-gray-700 border rounded-md hover:bg-gray-100"
            >
              <Eye className="h-4 w-4 mr-1" />
              Ver
            </button>
            <button
              onClick={() => onEdit(phone)}
              className="flex items-center px-2 py-1 text-sm text-gray-700 border rounded-md hover:bg-gray-100"
            >
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </button>
            {onCopy && (
              <button
                onClick={() => onCopy(phone)}
                className="flex items-center px-2 py-1 text-sm text-gray-700 border rounded-md hover:bg-gray-100"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copiar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(phone)}
                className="flex items-center px-2 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Excluir
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-gray-400" />
          <span className="font-medium text-gray-600 mr-2">Operadora:</span>
          <span className="bg-gray-50 text-gray-700 border rounded-md px-2 py-0.5 text-xs">
            {phone.operator || 'Não informado'}
          </span>
        </div>

        {phone.card && (
          <div className="flex items-center text-sm">
            <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium text-gray-600 mr-2">Cartão:</span>
            <span className="text-gray-900">{phone.card.name}</span>
          </div>
        )}

        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          <span className="font-medium text-gray-600 mr-2">Easy At:</span>
          <span className="text-gray-900">{formatDate(phone.easy_at)}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onView(phone)}
          className="flex-1 flex items-center justify-center bg-gradient-to-r from-pink-600 to-pink-700 text-white py-2 rounded-md shadow-lg hover:shadow-xl hover:from-pink-700 hover:to-pink-800 transition-all"
        >
          <Eye className="h-4 w-4 mr-2" />
          Visualizar
        </button>
        <button
          onClick={() => onEdit(phone)}
          className="flex-1 flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-50"
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </button>
      </div>
    </div>
  );
}
