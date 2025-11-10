const API_BASE_URL = "http://localhost/contingencia_php/src/App/";

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}/${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string) {
    return this.request('auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async logout() {
    return this.request('auth/logout', { method: 'POST' });
  }

  async getCurrentUser() {
    return this.request('auth/me');
  }

  async changePassword(oldPassword: string, newPassword: string) {
    return this.request('auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
    });
  }

  // Generic CRUD
  async getAll(resource: string) {
    return this.request(resource);
  }

  async getById(resource: string, id: number) {
    return this.request(`${resource}/${id}`);
  }

  async create(resource: string, data: any) {
    return this.request(resource, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update(resource: string, id: number, data: any) {
    return this.request(`${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(resource: string, id: number) {
    return this.request(`${resource}/${id}`, {
      method: 'DELETE',
    });
  }

  // Profiles
  async getProfiles() {
    const response = await this.getAll('profiles');
    return response.data;
  }

  async createProfile(data: any) {
    return this.create('profiles', data);
  }

  async updateProfile(id: number, data: any) {
    return this.update('profiles', id, data);
  }

  async deleteProfile(id: number) {
    return this.delete('profiles', id);
  }

  // Managers
  async getManagers() {
    const response = await this.getAll('managers');
    return response.data;
  }

  async createManager(data: any) {
    return this.create('managers', data);
  }

  async updateManager(id: number, data: any) {
    return this.update('managers', id, data);
  }

  async deleteManager(id: number) {
    return this.delete('managers', id);
  }

  // Cards
  async getCards() {
    const response = await this.getAll('cards');
    return response.data;
  }

  async createCard(data: any) {
    return this.create('cards', data);
  }

  async updateCard(id: number, data: any) {
    return this.update('cards', id, data);
  }

  async deleteCard(id: number) {
    return this.delete('cards', id);
  }

  // Phones
  async getPhones() {
    const response = await this.getAll('phones');
    return response.data;
  }

  async createPhone(data: any) {
    return this.create('phones', data);
  }

  async updatePhone(id: number, data: any) {
    return this.update('phones', id, data);
  }

  async deletePhone(id: number) {
    return this.delete('phones', id);
  }

  // Accounts
  async getAccounts() {
    const response = await this.getAll('accounts');
    return response.data;
  }

  async createAccount(data: any) {
    return this.create('accounts', data);
  }

  async updateAccount(id: number, data: any) {
    return this.update('accounts', id, data);
  }

  async deleteAccount(id: number) {
    return this.delete('accounts', id);
  }

  // Proxies
  async getProxies() {
    const response = await this.getAll('proxies');
    return response.data;
  }

  async createProxy(data: any) {
    return this.create('proxies', data);
  }

  async updateProxy(id: number, data: any) {
    return this.update('proxies', id, data);
  }

  async deleteProxy(id: number) {
    return this.delete('proxies', id);
  }

  // Logs
  async getLogs(filters?: any) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `logs?${queryParams}` : 'logs';
    const response = await this.request(endpoint);
    return response.data;
  }

  async getLogStats() {
    const response = await this.request('logs/stats');
    return response.data;
  }

  // Contadores
  getProfilesCount() {
    // Implementar lógica de contagem se necessário
    return { total: 0, active: 0, advertising: 0, available: 0, inactive: 0 };
  }

  getManagersCount() {
    return 0;
  }

  getCardsCount() {
    return 0;
  }

  getPhonesCount() {
    return 0;
  }

  getAccountsCount() {
    return 0;
  }

  getProxiesCount() {
    return 0;
  }
}

export const api = new ApiService();