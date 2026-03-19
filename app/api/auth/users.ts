// Shared mock users for login/register (module-level persistence)
export let mockUsers = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'user@example.com',
    password: 'password'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'test@example.com',
    password: 'test123'
  }
] as Array<{
  id: number;
  name: string;
  email: string;
  password: string;
}>;

export function getMaxId() {
  return mockUsers.length > 0 ? Math.max(...mockUsers.map(u => u.id)) : 0;
}
