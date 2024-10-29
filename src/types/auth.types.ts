
export type UserRole = 'administrator' | 'employee';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  department_id?: number;
  profile_picture?: string;
}

// export interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   loading: boolean;
// }

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// export interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   login: (credentials: LoginCredentials) => Promise<void>;
//   logout: () => void;
//   updateUser: (user: User) => void;
// }