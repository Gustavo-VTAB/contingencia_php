import type { Profile, Manager, Card, Phone } from '../types/api';

const API_BASE_URL = 'http://localhost/api';

interface CreateProfileData {
  name: string;
  status?: string;
  manager_id?: number;
  phone_id?: number;
  obs?: string;
}

interface CreateManagerData {
  name: string;
}

interface CreateCardData {
  name: string;
  status?: string;
  number?: string;
  validity?: string;
  cvv?: string;
  limit?: number;
  obs?: string;
}

interface CreatePhoneData {
  name?: string;
  status?: string;
  number: string;
  operator?: string;
  easy_at?: string;
  card_id?: number;
}

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Profiles
  async getProfiles(): Promise<Profile[]> {
    return this.request('/profiles');
  }

  async getProfile(id: number): Promise<Profile> {
    return this.request(`/profiles/${id}`);
  }

  async createProfile(data: CreateProfileData) {
    return this.request('/profiles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProfile(id: number, data: CreateProfileData) {
    return this.request(`/profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProfile(id: number) {
    return this.request(`/profiles/${id}`, {
      method: 'DELETE',
    });
  }

  // Managers
  async getManagers(): Promise<Manager[]> {
    return this.request('/managers');
  }

  async createManager(data: CreateManagerData) {
    return this.request('/managers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateManager(id: number, data: CreateManagerData) {
    return this.request(`/managers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteManager(id: number) {
    return this.request(`/managers/${id}`, {
      method: 'DELETE',
    });
  }

  // Cards
  async getCards(): Promise<Card[]> {
    return this.request('/cards');
  }

  async createCard(data: CreateCardData) {
    return this.request('/cards', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCard(id: number, data: CreateCardData) {
    return this.request(`/cards/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCard(id: number) {
    return this.request(`/cards/${id}`, {
      method: 'DELETE',
    });
  }

  // Phones
  async getPhones(): Promise<Phone[]> {
    return this.request('/phones');
  }

  async createPhone(data: CreatePhoneData) {
    return this.request('/phones', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePhone(id: number, data: CreatePhoneData) {
    return this.request(`/phones/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePhone(id: number) {
    return this.request(`/phones/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();