import {Contador} from '../components/ui/Contador';
import type { FbProfile } from '../types';
import { Eye, Edit, User, Mail, Phone, Shield } from 'lucide-react';

interface ProfileCardProps {
  profile: FbProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const statusConfig = {
    active: { label: 'Ativo', className: 'bg-green-100 text-green-800 border-green-200' },
    advertising: { label: 'Anunciando', className: 'bg-blue-100 text-blue-800 border-blue-200' },
    available: { label: 'Disponível', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    inactive: { label: 'Inativo', className: 'bg-red-100 text-red-800 border-red-200' },
  };

  const statusInfo = statusConfig[profile.status] || statusConfig.active;

  // Gera iniciais simples
  const initials = profile.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-sm rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all bg-white/60 backdrop-blur-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white font-bold shadow">
            {initials}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">{profile.name}</h3>
            <p className="text-sm text-gray-500 truncate max-w-[200px]">{profile.email}</p>
          </div>
        </div>

        <Contador
        count={statusInfo.label}
        active={profile.status === 'active'}/>
      </div>

      {/* Info */}
      <div className="space-y-3 mb-6 text-sm text-gray-700">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          <span className="font-medium text-gray-600 mr-1">Gestor:</span>
          <span>{profile.manager?.name || 'Não atribuído'}</span>
        </div>

        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-gray-400" />
          <span className="font-medium text-gray-600 mr-1">Recuperação:</span>
          <span>{profile.recovery_email || 'Não configurado'}</span>
        </div>

        {profile.phone_number && (
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            <span>{profile.phone_number}</span>
          </div>
        )}

        <div className="flex items-center">
          <Shield className="h-4 w-4 mr-2 text-gray-400" />
          <span className="font-mono text-xs">
            {profile.proxy === 'Sem proxy' ? (
              <span className="text-gray-500 italic">Sem proxy</span>
            ) : (
              profile.proxy
            )}
          </span>
        </div>
      </div>

      {/* Contadores */}
      <div className="flex items-center justify-between mb-6 p-3 bg-gray-50/50 rounded-xl">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
          <span className="text-sm font-medium text-teal-700">
            {profile.pages_count || 0} Páginas
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span className="text-sm font-medium text-purple-700">
            {profile.bms_count || 0} BMs
          </span>
        </div>
      </div>

      {/* Botões fixos */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow transition-all flex items-center justify-center gap-2">
          <Eye className="h-4 w-4" />
          Visualizar
        </button>
        <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 rounded-lg transition-all flex items-center justify-center gap-2">
          <Edit className="h-4 w-4" />
          Editar
        </button>
      </div>
    </div>
  );
}
