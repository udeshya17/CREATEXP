import { Client, SortCriterion } from '@/types/client';

/**
 * Multi-sort function that applies multiple sort criteria in order of priority
 */
export function multiSort(clients: Client[], criteria: SortCriterion[]): Client[] {
  if (criteria.length === 0) {
    return [...clients];
  }

  return [...clients].sort((a, b) => {
    for (const criterion of criteria) {
      let aValue: string | number;
      let bValue: string | number;

      // Get the values to compare based on the field
      switch (criterion.field) {
        case 'clientName':
          aValue = a.clientName.toLowerCase();
          bValue = b.clientName.toLowerCase();
          break;
        case 'createdAt':
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
        case 'updatedAt':
          aValue = a.updatedAt.getTime();
          bValue = b.updatedAt.getTime();
          break;
        case 'clientId':
          aValue = a.id;
          bValue = b.id;
          break;
        default:
          continue;
      }

      // Compare the values
      let comparison = 0;
      
      if (aValue < bValue) {
        comparison = -1;
      } else if (aValue > bValue) {
        comparison = 1;
      }

      // If values are equal, continue to next criterion
      if (comparison === 0) {
        continue;
      }

      // Apply sort direction
      return criterion.direction === 'asc' ? comparison : -comparison;
    }

    // If all criteria result in equality, maintain original order
    return 0;
  });
}

/**
 * Helper function to get display value for a sort field
 */
export function getSortDisplayValue(client: Client, field: string): string {
  switch (field) {
    case 'clientName':
      return client.clientName;
    case 'createdAt':
      return client.createdAt.toLocaleDateString();
    case 'updatedAt':
      return client.updatedAt.toLocaleDateString();
    case 'clientId':
      return client.id.toString();
    default:
      return '';
  }
}
