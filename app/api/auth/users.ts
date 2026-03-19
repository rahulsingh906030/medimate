import fs from 'fs'
import path from 'path' 

const USERS_FILE = path.join(process.cwd(), 'app/api/auth', 'users.json')

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
}

export function readUsers(): User[] {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(data) as User[]
  } catch {
    return []
  }
}

export function writeUsers(users: User[]): void {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

export function getNextId(): number {
  const users = readUsers()
  return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
}


