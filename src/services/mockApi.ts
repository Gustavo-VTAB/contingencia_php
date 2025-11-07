import type { Profile, Manager, Card, Phone, Account, Proxy } from '../types';

// Dados mock para desenvolvimento
const mockManagers: Manager[] = [
  { id: 1, name: 'João Silva' },
  { id: 2, name: 'Maria Santos' },
  { id: 3, name: 'Pedro Costa' },
  { id: 4, name: 'Ana Oliveira' },
];

const mockCards: Card[] = [
  { id: 1, name: 'Cartão Principal', status: 'active', number: '**** 1234', validity: '12/25', limit: 5000, obs: 'Cartão para campanhas principais' },
  { id: 2, name: 'Cartão Backup', status: 'active', number: '**** 5678', validity: '06/26', limit: 3000, obs: 'Cartão de reserva' },
  { id: 3, name: 'Cartão Teste', status: 'inactive', number: '**** 9999', validity: '03/24', limit: 1000, obs: 'Cartão para testes' },
];

const mockPhones: Phone[] = [
  { id: 1, name: 'iPhone 13', status: 'active', number: '(11) 99999-1234', operator: 'Vivo', card_id: 1 },
  { id: 2, name: 'Samsung S21', status: 'active', number: '(11) 99999-5678', operator: 'Claro', card_id: 2 },
  { id: 3, name: 'Xiaomi Mi 11', status: 'inactive', number: '(11) 99999-9999', operator: 'Tim', card_id: 1 },
  { id: 4, name: 'iPhone 12', status: 'active', number: '(11) 99999-7777', operator: 'Oi', card_id: 3 },
];

const mockProfiles: Profile[] = [
  {
    id: 1,
    name: 'João Marketing',
    status: 'active',
    email: 'joao@email.com',
    phone_number: '(11) 99999-1234',
    obs: 'Perfil principal para campanhas',
    manager_id: 1,
    phone_id: 1,
    pages_count: 5,
    bms_count: 2,
  },
  {
    id: 2,
    name: 'Maria Vendas',
    status: 'advertising',
    email: 'maria@email.com',
    phone_number: '(11) 99999-5678',
    obs: 'Perfil para vendas online',
    manager_id: 2,
    phone_id: 2,
    pages_count: 3,
    bms_count: 1,
  },
  {
    id: 3,
    name: 'Pedro Backup',
    status: 'available',
    email: 'pedro@email.com',
    phone_number: '(11) 99999-9999',
    obs: 'Perfil de reserva',
    manager_id: 3,
    phone_id: 3,
    pages_count: 0,
    bms_count: 0,
  },
  {
    id: 4,
    name: 'Ana Digital',
    status: 'inactive',
    email: 'ana@email.com',
    phone_number: '(11) 99999-7777',
    obs: 'Perfil suspenso temporariamente',
    manager_id: 1,
    phone_id: 4,
    pages_count: 2,
    bms_count: 1,
  },
];

const mockAccounts: Account[] = [
  { id: 1, name: 'Conta Principal', status: 'active', email: 'conta1@empresa.com', obs: 'Conta principal da empresa' },
  { id: 2, name: 'Conta Backup', status: 'active', email: 'conta2@empresa.com', obs: 'Conta de backup' },
  { id: 3, name: 'Conta Teste', status: 'inactive', email: 'teste@empresa.com', obs: 'Conta para testes' },
];

const mockProxies: Proxy[] = [
  { id: 1, name: 'Proxy US', status: 'active', ip: '192.168.1.100', port: 8080, username: 'user1', obs: 'Proxy dos Estados Unidos' },
  { id: 2, name: 'Proxy BR', status: 'active', ip: '192.168.1.101', port: 8081, username: 'user2', obs: 'Proxy do Brasil' },
  { id: 3, name: 'Proxy EU', status: 'inactive', ip: '192.168.1.102', port: 8082, username: 'user3', obs: 'Proxy da Europa' },
];

export class MockApiService {
  private delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getProfiles(): Promise<Profile[]> {
    await this.delay();
    return mockProfiles.map(profile => ({
      ...profile,
      manager: mockManagers.find(m => m.id === profile.manager_id),
      phone: mockPhones.find(p => p.id === profile.phone_id),
    }));
  }

  async getManagers(): Promise<Manager[]> {
    await this.delay();
    return mockManagers;
  }

  async getCards(): Promise<Card[]> {
    await this.delay();
    return mockCards;
  }

  async getPhones(): Promise<Phone[]> {
    await this.delay();
    return mockPhones.map(phone => ({
      ...phone,
      card: mockCards.find(c => c.id === phone.card_id),
    }));
  }

  async getAccounts(): Promise<Account[]> {
    await this.delay();
    return mockAccounts;
  }

  async getProxies(): Promise<Proxy[]> {
    await this.delay();
    return mockProxies;
  }

  // Contadores para badges
  getProfilesCount() {
    return {
      total: mockProfiles.length,
      active: mockProfiles.filter(p => p.status === 'active').length,
      advertising: mockProfiles.filter(p => p.status === 'advertising').length,
      available: mockProfiles.filter(p => p.status === 'available').length,
      inactive: mockProfiles.filter(p => p.status === 'inactive').length,
    };
  }

  getManagersCount() {
    return mockManagers.length;
  }

  getCardsCount() {
    return mockCards.length;
  }

  getPhonesCount() {
    return mockPhones.length;
  }

  getAccountsCount() {
    return mockAccounts.length;
  }

  getProxiesCount() {
    return mockProxies.length;
  }
}

export const mockApi = new MockApiService();