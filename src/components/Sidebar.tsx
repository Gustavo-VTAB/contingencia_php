import { useState } from 'react';
import { 
  Users, 
  Smartphone, 
  CreditCard, 
  UserCheck, 
  Building, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  Facebook
} from 'lucide-react';
import type { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  counts: {
    profiles: number;
    managers: number;
    cards: number;
    phones: number;
  };
}

const navItems = [
  { id: 'profiles' as TabType, label: 'Perfis', icon: Users },
  { id: 'managers' as TabType, label: 'Gestores', icon: UserCheck },
  { id: 'cards' as TabType, label: 'Cartões', icon: CreditCard },
  { id: 'phones' as TabType, label: 'Celulares', icon: Smartphone },
  { id: 'accounts' as TabType, label: 'Contas', icon: Building },
  { id: 'proxies' as TabType, label: 'Proxies', icon: Zap },
];

export default function Sidebar({ activeTab, onTabChange, counts }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const getCount = (tabId: TabType) => {
    return counts[tabId as keyof typeof counts] || 0;
  };

  return (
    <aside className={`transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'} bg-gray-800 text-white flex flex-col flex-shrink-0`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between h-16 border-b border-gray-700">
        {isExpanded && (
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-1.5 rounded">
              <Facebook className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-bold">FB Manager</h2>
          </div>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white hover:bg-gray-700 p-2 rounded transition-colors"
        >
          {isExpanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const count = getCount(item.id);

          return (
            <button
              key={item.id}
              className={`w-full flex items-center justify-start p-3 rounded-lg text-sm transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
              {isExpanded && (
                <>
                  <span className="flex-grow text-left">{item.label}</span>
                  {count > 0 && (
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      isActive 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : 'bg-gray-600 text-gray-200'
                    }`}>
                      {count}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          className="w-full flex items-center justify-start p-3 rounded-lg text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
          onClick={() => alert('Logout realizado!')}
        >
          <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
          {isExpanded && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}