// src/components/AbasNavegacao.tsx
import { Users, Building2, FileText, CreditCard, Phone } from 'lucide-react';
import { Contador } from './ui/Contador';
import type { TabType } from '../types';

export interface TabItem {
  id: TabType;
  label: string;
  count: number;
}

interface AbasNavegacaoProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  tabs: TabItem[];
}

const tabIcons: Record<TabType, any> = {
  profiles: Users,
  portfolios: Building2,
  pages: FileText,
  cards: CreditCard,
  phones: Phone,
};

export default function AbasNavegacao({ activeTab, onTabChange, tabs }: AbasNavegacaoProps) {
  return (
    <div className="flex items-center flex-wrap gap-2 mb-6">
      {tabs.map((tab) => {
        const Icon = tabIcons[tab.id];
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              isActive
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{tab.label}</span>
            <Contador count={tab.count} active={isActive} />
          </button>
        );
      })}
    </div>
  );
}
