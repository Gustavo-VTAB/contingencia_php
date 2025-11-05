import { useState, useEffect } from 'react';
import { apiService } from '../Services/api';
import type { DataItem } from '../types/api';

interface FilterState {
  search: string;
  status: string;
  sortBy: string;
}

type EndpointType = 'profiles' | 'managers' | 'cards' | 'phones';

export function useApi<T extends DataItem>(endpoint: EndpointType) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    sortBy: 'name',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let result: T[];
      switch (endpoint) {
        case 'profiles':
          result = (await apiService.getProfiles()) as T[];
          break;
        case 'managers':
          result = (await apiService.getManagers()) as T[];
          break;
        case 'cards':
          result = (await apiService.getCards()) as T[];
          break;
        case 'phones':
          result = (await apiService.getPhones()) as T[];
          break;
        default:
          throw new Error('Endpoint inválido');
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  // --- FILTROS E ORDENAÇÃO ---
  const filteredData = data
    .filter((item: T) => {
      // Filtro de busca
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableFields = ['name', 'number', 'operator', 'email'];

        const matches = searchableFields.some((field) => {
          if (field in item) {
            const value = (item as Record<string, any>)[field];
            return value && value.toString().toLowerCase().includes(searchTerm);
          }
          return false;
        });

        if (!matches) return false;
      }

      // Filtro de status
      if (filters.status !== 'all' && 'status' in item && item.status !== filters.status) {
        return false;
      }

      return true;
    })
    .sort((a: T, b: T) => {
      const aValue = (a as Record<string, any>)[filters.sortBy] || '';
      const bValue = (b as Record<string, any>)[filters.sortBy] || '';

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // --- CRUD OPERATIONS ---
  const create = async (itemData: Partial<T>) => {
    switch (endpoint) {
      case 'profiles':
        await apiService.createProfile(itemData as any);
        break;
      case 'managers':
        await apiService.createManager(itemData as any);
        break;
      case 'cards':
        await apiService.createCard(itemData as any);
        break;
      case 'phones':
        await apiService.createPhone(itemData as any);
        break;
    }
    await fetchData();
  };

  const update = async (id: number, itemData: Partial<T>) => {
    switch (endpoint) {
      case 'profiles':
        await apiService.updateProfile(id, itemData as any);
        break;
      case 'managers':
        await apiService.updateManager(id, itemData as any);
        break;
      case 'cards':
        await apiService.updateCard(id, itemData as any);
        break;
      case 'phones':
        await apiService.updatePhone(id, itemData as any);
        break;
    }
    await fetchData();
  };

  const remove = async (id: number) => {
    switch (endpoint) {
      case 'profiles':
        await apiService.deleteProfile(id);
        break;
      case 'managers':
        await apiService.deleteManager(id);
        break;
      case 'cards':
        await apiService.deleteCard(id);
        break;
      case 'phones':
        await apiService.deletePhone(id);
        break;
    }
    await fetchData();
  };

  // --- RETORNO FINAL ---
  return {
    data: filteredData,
    loading,
    error,
    filters,
    updateFilters,
    totalCount: data.length,
    filteredCount: filteredData.length,
    refresh: fetchData,
    create,
    update,
    remove,
  };
}
