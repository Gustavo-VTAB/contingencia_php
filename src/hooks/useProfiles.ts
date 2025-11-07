import { useState, useEffect, useMemo } from 'react';
import { mockApi } from '../services/mockApi';
import type { Profile, FilterState } from '../types';

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    sortBy: 'name',
  });

  // Carregar dados
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockApi.getProfiles();
      setProfiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar perfis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Filtrar e ordenar dados
  const filteredProfiles = useMemo(() => {
    let result = [...profiles];

    // Filtro de busca
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm) ||
        profile.email?.toLowerCase().includes(searchTerm) ||
        profile.manager?.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro de status
    if (filters.status !== 'all') {
      result = result.filter(profile => profile.status === filters.status);
    }

    // Ordenação
    result.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (filters.sortBy) {
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'manager':
          aValue = a.manager?.name || '';
          bValue = b.manager?.name || '';
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      return aValue.localeCompare(bValue);
    });

    return result;
  }, [profiles, filters]);

  // Contadores
  const statusCounts = useMemo(() => {
    return mockApi.getProfilesCount();
  }, [profiles]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    profiles: filteredProfiles,
    loading,
    error,
    filters,
    updateFilters,
    totalCount: profiles.length,
    filteredCount: filteredProfiles.length,
    statusCounts,
    refresh: fetchProfiles,
  };
}