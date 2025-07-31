// Client data types

export type ClientType = 'Individual' | 'Company';

export interface Client {
  id: number;
  clientName: string;
  clientType: ClientType;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

export type SortField = 'clientName' | 'createdAt' | 'updatedAt' | 'clientId';

export type SortDirection = 'asc' | 'desc';

export interface SortCriterion {
  id: string;
  field: SortField;
  direction: SortDirection;
  label: string;
}

export interface SortState {
  criteria: SortCriterion[];
}

export type ClientFilter = 'All' | 'Individual' | 'Company';

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface DateFilters {
  createdAt: DateRange;
  updatedAt: DateRange;
}
