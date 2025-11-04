import { useState, useMemo } from 'react';
import type { FilterState } from '../types';

interface UseFiltersProps<T> {
  data: T[];
  initialFilters?: Partial<FilterState>;
  searchFields: (keyof T)[];
  statusField: keyof T;
  managerField?: keyof T;
}

export function useFilters<T extends Record<string, unknown>>({
  data,
  initialFilters = {},
  searchFields,
  statusField,
  managerField
}: UseFiltersProps<T>) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    manager: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
    ...initialFilters
  });

  const filteredData = useMemo(() => {
    let result = [...data];

    if (filters.search) {
      result = result.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          return value && value.toString().toLowerCase().includes(filters.search.toLowerCase());
        })
      );
    }

    if (filters.status !== 'all') {
      result = result.filter(item => item[statusField] === filters.status);
    }

    if (filters.manager !== 'all' && managerField) {
      result = result.filter(item => {
        const manager = item[managerField] as { id?: number };
        return manager && manager.id?.toString() === filters.manager;
      });
    }

    result.sort((a, b) => {
      let aValue = a[filters.sortBy as keyof T];
      let bValue = b[filters.sortBy as keyof T];

      if (filters.sortBy === 'manager' && managerField) {
        const aManager = a[managerField] as { name?: string };
        const bManager = b[managerField] as { name?: string };
        aValue = aManager?.name || '';
        bValue = bManager?.name || '';
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return filters.sortOrder === 'asc' ? comparison : -comparison;
      }

      if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, filters, searchFields, statusField, managerField]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    filters,
    filteredData,
    updateFilters,
    totalCount: data.length,
    filteredCount: filteredData.length
  };
}