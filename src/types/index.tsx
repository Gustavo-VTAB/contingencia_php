
export interface Usuario {
    id:number;
    name:string;
    email:string;
    password:string;
    isAdmin:boolean;
    status:string;
    
}
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
  status: 'active' | 'inactive';
  name: string;
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
}

export interface FbProfile {
  id: number;
  manager_id?: number;
  phone_id?: number;
  name: string;
  status: 'active' | 'inactive' | 'advertising' | 'available';
  obs?: string;
  manager?: Manager;
  phone?: Phone;
  email?: string;
  recovery_email?: string;
  phone_number?: string;
  proxy?: string;
  pages_count?: number;
  bms_count?: number;
}

export interface FbBm {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  obs?: string;
}

export interface FbPage {
  id: number;
  status: 'active' | 'inactive';
  name: string;
  ig_login?: string;
  ig_email?: string;
  ig_password?: string;
  obs?: string;
}

export type TabType = 'profiles' | 'portfolios' | 'pages' | 'cards' | 'phones';

export interface TabItem {
  id: TabType;
  label: string;
  count: number;
  icon: string;
}