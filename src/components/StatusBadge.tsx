interface StatusBadgeProps {
  status: string;
  count?: number;
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
  all: {
    label: 'Todos',
    className: 'bg-gray-100 text-gray-800 border-gray-200'
  }
};

export default function StatusBadge({ status, count }: StatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
      {count !== undefined && (
        <span className="ml-1 bg-white bg-opacity-50 rounded-full px-1.5 py-0.5 text-xs">
          {count}
        </span>
      )}
    </span>
  );
}