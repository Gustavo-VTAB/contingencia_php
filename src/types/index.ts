export interface Manager {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
  status: 'active' | 'inactive';
}

export interface Card {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  number?: string;
  validity?: string;
  cvv?: string;
  limit?: number;
  obs?: string;
}

export interface Phone {
  id: number;
  card_id?: number;
  name?: string;
  status: 'active' | 'inactive';
  number?: string;
  operator?: string;
  easy_at?: string;
  card?: Card;
}

export interface Profile {
  id: number;
  manager_id?: number;
  phone_id?: number;
  name: string;
  status: 'active' | 'inactive' | 'advertising' | 'available';
  obs?: string;
  manager?: Manager;
  phone?: Phone;
  email?: string;
  phone_number?: string;
  pages_count?: number;
  bms_count?: number;
}

export interface Account {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  email?: string;
  obs?: string;
}

export interface Proxy {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  ip?: string;
  port?: number;
  username?: string;
  password?: string;
  obs?: string;
}

export type TabType = 'profiles' | 'managers' | 'cards' | 'phones' | 'accounts' | 'proxies';

export interface FilterState {
  search: string;
  status: string;
  sortBy: string;
}