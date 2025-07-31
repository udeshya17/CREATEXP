import { Client } from '@/types/client';

// Mock client data
export const mockClients: Client[] = [
  {
    id: 20,
    clientName: 'John Doe',
    clientType: 'Individual',
    email: 'johndoe@email.com',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-07-20T14:45:00Z'),
    status: 'Active'
  },
  {
    id: 21,
    clientName: 'Test Test',
    clientType: 'Individual',
    email: 'test@test.com',
    createdAt: new Date('2024-02-10T09:15:00Z'),
    updatedAt: new Date('2024-07-25T16:20:00Z'),
    status: 'Active'
  },
  {
    id: 22,
    clientName: 'Acme Corporation',
    clientType: 'Company',
    email: 'contact@acme.com',
    createdAt: new Date('2024-01-05T08:00:00Z'),
    updatedAt: new Date('2024-07-28T11:30:00Z'),
    status: 'Active'
  },
  {
    id: 23,
    clientName: 'Jane Smith',
    clientType: 'Individual',
    email: 'jane.smith@email.com',
    createdAt: new Date('2024-03-20T13:45:00Z'),
    updatedAt: new Date('2024-07-22T10:15:00Z'),
    status: 'Inactive'
  },
  {
    id: 24,
    clientName: 'Tech Solutions Inc',
    clientType: 'Company',
    email: 'info@techsolutions.com',
    createdAt: new Date('2024-01-30T15:20:00Z'),
    updatedAt: new Date('2024-07-26T09:45:00Z'),
    status: 'Active'
  },
  {
    id: 25,
    clientName: 'Bob Johnson',
    clientType: 'Individual',
    email: 'bob.johnson@email.com',
    createdAt: new Date('2024-04-12T11:10:00Z'),
    updatedAt: new Date('2024-07-24T15:30:00Z'),
    status: 'Active'
  },
  {
    id: 26,
    clientName: 'Global Enterprises',
    clientType: 'Company',
    email: 'hello@global.com',
    createdAt: new Date('2024-02-28T16:40:00Z'),
    updatedAt: new Date('2024-07-29T12:20:00Z'),
    status: 'Active'
  },
  {
    id: 27,
    clientName: 'Alice Brown',
    clientType: 'Individual',
    email: 'alice.brown@email.com',
    createdAt: new Date('2024-05-08T14:25:00Z'),
    updatedAt: new Date('2024-07-23T17:10:00Z'),
    status: 'Inactive'
  }
];
