'use client';

import { Client, ClientFilter, DateFilters } from '@/types/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Filter, Plus } from 'lucide-react';
import { DateRangeFilter, DateRange } from '@/components/DateRangeFilter';

interface ClientTableProps {
  clients: Client[];
  filter: ClientFilter;
  onFilterChange: (filter: ClientFilter) => void;
  onToggleSort?: () => void;
  sortCriteriaCount?: number;
  searchQuery: string;
  debouncedSearchQuery: string;
  onSearchChange: (query: string) => void;
  dateFilters: DateFilters;
  onDateFiltersChange: (filters: DateFilters) => void;
}

export function ClientTable({
  clients,
  filter,
  onFilterChange,
  onToggleSort,
  sortCriteriaCount = 0,
  searchQuery,
  debouncedSearchQuery,
  onSearchChange,
  dateFilters,
  onDateFiltersChange
}: ClientTableProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === 'Active' ? 'default' : 'secondary';
  };

  const filteredClients = clients.filter(client => {
    // Filter by client type
    const typeMatch = filter === 'All' || client.clientType === filter;

    // Filter by search query (using debounced value)
    const searchMatch = !debouncedSearchQuery ||
      client.clientName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      client.id.toString().includes(debouncedSearchQuery);

    // Filter by created date range
    const createdAtMatch = (!dateFilters?.createdAt?.from || client.createdAt >= dateFilters.createdAt.from) &&
      (!dateFilters?.createdAt?.to || client.createdAt <= dateFilters.createdAt.to);

    // Filter by updated date range
    const updatedAtMatch = (!dateFilters?.updatedAt?.from || client.updatedAt >= dateFilters.updatedAt.from) &&
      (!dateFilters?.updatedAt?.to || client.updatedAt <= dateFilters.updatedAt.to);

    return typeMatch && searchMatch && createdAtMatch && updatedAtMatch;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <Button className="bg-black text-white hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {(['All', 'Individual', 'Company'] as ClientFilter[]).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => onFilterChange(filterOption)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  filter === filterOption
                    ? 'bg-gray-100 text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <DateRangeFilter
            label="Created"
            value={dateFilters?.createdAt || { from: undefined, to: undefined }}
            onChange={(range) => onDateFiltersChange({ ...dateFilters, createdAt: range })}
          />

          <DateRangeFilter
            label="Updated"
            value={dateFilters?.updatedAt || { from: undefined, to: undefined }}
            onChange={(range) => onDateFiltersChange({ ...dateFilters, updatedAt: range })}
          />

          <Button variant="outline" size="sm" onClick={onToggleSort}>
            <Filter className="w-4 h-4 mr-2" />
            {sortCriteriaCount}
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" className="rounded" />
              </TableHead>
              <TableHead>Client ID</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Client Type</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="hover:bg-gray-50 transition-colors">
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell className="text-blue-600 font-medium">
                  {client.id}
                </TableCell>
                <TableCell className="font-medium">
                  {client.clientName}
                </TableCell>
                <TableCell>
                  {client.clientType}
                </TableCell>
                <TableCell className="text-gray-600">
                  {client.email}
                </TableCell>
                <TableCell className="text-gray-600">
                  {formatDate(client.createdAt)}
                </TableCell>
                <TableCell className="text-gray-600">
                  {formatDate(client.updatedAt)}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(client.status)}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">
                  hello world
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
