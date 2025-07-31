'use client';

import { useState, useMemo } from 'react';
import { ClientTable } from '@/components/ClientTable';
import { SortPanel } from '@/components/SortPanel';
import { mockClients } from '@/data/mockClients';
import { ClientFilter, SortCriterion, DateFilters } from '@/types/client';
import { multiSort } from '@/utils/sorting';
import { useSortPersistence } from '@/hooks/useSortPersistence';
import { useDebounce } from '@/hooks/useDebounce';

export default function Home() {
  const [filter, setFilter] = useState<ClientFilter>('All');
  const [sortCriteria, setSortCriteria] = useSortPersistence();
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilters, setDateFilters] = useState<DateFilters>({
    createdAt: { from: undefined, to: undefined },
    updatedAt: { from: undefined, to: undefined }
  });

  // Debounce search query to avoid excessive filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Apply sorting to clients
  const sortedClients = useMemo(() => {
    return multiSort(mockClients, sortCriteria);
  }, [sortCriteria]);

  const handleApplySort = () => {
    // Sort is applied automatically through useMemo
  };

  const handleClearAll = () => {
    setSortCriteria([]);
  };

  const toggleSortPanel = () => {
    setShowSortPanel(!showSortPanel);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 p-6 transition-all duration-300 ${showSortPanel ? 'mr-80' : ''}`}>
          <ClientTable
            clients={sortedClients}
            filter={filter}
            onFilterChange={setFilter}
            onToggleSort={toggleSortPanel}
            sortCriteriaCount={sortCriteria.length}
            searchQuery={searchQuery}
            debouncedSearchQuery={debouncedSearchQuery}
            onSearchChange={setSearchQuery}
            dateFilters={dateFilters}
            onDateFiltersChange={setDateFilters}
          />

        </div>

        {/* Sort Panel */}
        {showSortPanel && (
          <div className="fixed right-0 top-0 h-full z-10 animate-in slide-in-from-right duration-300">
            <SortPanel
              criteria={sortCriteria}
              onCriteriaChange={setSortCriteria}
              onApplySort={handleApplySort}
              onClearAll={handleClearAll}
              onClose={toggleSortPanel}
            />
          </div>
        )}
      </div>
    </div>
  );
}
