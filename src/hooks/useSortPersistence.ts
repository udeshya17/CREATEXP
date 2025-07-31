import { useState, useEffect } from 'react';
import { SortCriterion } from '@/types/client';

const STORAGE_KEY = 'client-sort-criteria';

export function useSortPersistence() {
  const [sortCriteria, setSortCriteria] = useState<SortCriterion[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSortCriteria(parsed);
      }
    } catch (error) {
      console.error('Failed to load sort criteria from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever criteria changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sortCriteria));
    } catch (error) {
      console.error('Failed to save sort criteria to localStorage:', error);
    }
  }, [sortCriteria]);

  return [sortCriteria, setSortCriteria] as const;
}
