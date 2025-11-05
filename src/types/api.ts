export interface Profile {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  obs?: string;
  email?: string;
  recovery_email?: string;
  phone_number?: string;
  proxy?: string;
  pages_count?: number;
  bms_count?: number;
  manager?: {
    id: number;
    name: string;
  };
  phone?: {
    id: number;
    number: string;
    operator: string;
  };
}

export interface Manager {
  id: number;
  name: string;
  profiles_count?: number;
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
  name?: string;
  status: 'active' | 'inactive';
  number: string;
  operator?: string;
  easy_at?: string;
  card?: {
    id: number;
    name: string;
  };
}

export type DataItem = Profile | Manager | Card | Phone;