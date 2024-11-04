
export type UserRole = 'administrator' | 'employee';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName:string;
  role: UserRole;
  department_id?: number;
  profileImageUrl?: string; 
}


export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
