import { Card, CardContent, CardHeader } from './ui/card';
import { User, Phone, Mail, MessageSquare, Eye, Edit, Trash2 } from 'lucide-react';
import type { Profile } from '../types';
import StatusBadge from './StatusBadge';

interface ProfileCardProps {
  profile: Profile;
  onView?: (profile: Profile) => void;
  onEdit?: (profile: Profile) => void;
  onDelete?: (profile: Profile) => void;
}

export default function ProfileCard({ profile, onView, onEdit, onDelete }: ProfileCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{profile.name}</h3>
              {profile.email && (
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Mail className="h-3 w-3 mr-1" />
                  {profile.email}
                </p>
              )}
            </div>
          </div>
          <StatusBadge status={profile.status} />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2 mb-4">
          {profile.phone_number && (
            <p className="text-sm text-gray-600 flex items-center">
              <Phone className="h-3 w-3 mr-2" />
              {profile.phone_number}
            </p>
          )}
          
          {profile.manager && (
            <p className="text-sm text-gray-600 flex items-center">
              <User className="h-3 w-3 mr-2" />
              Gestor: {profile.manager.name}
            </p>
          )}

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Páginas: {profile.pages_count || 0}</span>
            <span>BMs: {profile.bms_count || 0}</span>
          </div>

          {profile.obs && (
            <div className="bg-gray-50 p-2 rounded text-sm text-gray-600 flex items-start">
              <MessageSquare className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
              {profile.obs}
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onView?.(profile)}
            className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Eye className="h-3 w-3 mr-1" />
            Ver
          </button>
          <button
            onClick={() => onEdit?.(profile)}
            className="flex items-center px-3 py-1.5 text-sm border border-blue-400 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit className="h-3 w-3 mr-1" />
            Editar
          </button>
          <button
            onClick={() => onDelete?.(profile)}
            className="flex items-center px-3 py-1.5 text-sm border border-red-400 text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Excluir
          </button>
        </div>
      </CardContent>
    </Card>
  );
}