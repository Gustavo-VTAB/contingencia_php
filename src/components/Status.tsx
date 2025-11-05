import { Contador } from './ui/Contador';

interface StatusProps {
  status: string;
  className?: string;
}

const statusConfig = {
  active: {
    label: 'Ativo',
    className: 'bg-green-100 text-green-800 border-green-200'
  },
  advertising: {
    label: 'Anunciando',
    className: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  available: {
    label: 'Disponível',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  inactive: {
    label: 'Inativo',
    className: 'bg-red-100 text-red-800 border-red-200'
  },
  admin: {
    label: 'Administrador',
    className: 'bg-purple-100 text-purple-800 border-purple-200'
  }
};

export default function StatusContador({ status, className = '' }: StatusProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  
  return (
    <Contador 
      variant="outline" 
      className={`${config.className} ${className} font-medium`}
    >
      {config.label}
    </Contador>
  );
}