import { useState, useEffect, useMemo } from 'react';
import { mockApi } from '../services/mockApi';
import type { Profile, Manager, Card, Phone, Account, Proxy, FilterState, TabType } from '../types';

type DataType = Profile | Manager | Card | Phone | Account | Proxy;

export function useData<T extends DataType>(endpoint: TabType) {
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
          result = (await mockApi.getProfiles()) as T[];
          break;
        case 'managers':
          result = (await mockApi.getManagers()) as T[];
          break;
        case 'cards':
          result = (await mockApi.getCards()) as T[];
          break;
        case 'phones':
          result = (await mockApi.getPhones()) as T[];
          break;
        case 'accounts':
          result = (await mockApi.getAccounts()) as T[];
          break;
        case 'proxies':
          result = (await mockApi.getProxies()) as T[];
          break;
        default:
          result = [];
      }
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const filteredData = useMemo(() => {
    let result = [...data];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(item => {
        const searchableFields = ['name', 'email', 'number', 'operator', 'ip'];
        return searchableFields.some(field => {
          const value = (item as any)[field];
          return value && value.toString().toLowerCase().includes(searchTerm);
        });
      });
    }

    if (filters.status !== 'all' && 'status' in result[0]) {
      result = result.filter(item => (item as any).status === filters.status);
    }

    result.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (filters.sortBy) {
        case 'status':
          aValue = (a as any).status || '';
          bValue = (b as any).status || '';
          break;
        default:
          aValue = (a as any).name || '';
          bValue = (b as any).name || '';
      }

      return aValue.localeCompare(bValue);
    });

    return result;
  }, [data, filters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    data: filteredData,
    loading,
    error,
    filters,
    updateFilters,
    totalCount: data.length,
    filteredCount: filteredData.length,
    refresh: fetchData,
  };
}