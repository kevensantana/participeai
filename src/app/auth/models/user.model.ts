export interface User {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  password: string;
  status: 'ativo' | 'inativo';
  createdAt: string;
  role: 'usuario' | 'admin';
  acceptTerms: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  password: string;
  confirmPassword: string;
  status: 'ativo' | 'inativo';
  createdAt: string;
  role: 'usuario' | 'admin';
  acceptTerms: boolean;
}

export interface UserUpdate {
  id: string;
  name?: string;
  cpf?: string;
  birthDate?: string;
  email?: string;
  password?: string;
  status?: 'ativo' | 'inativo';
  role?: 'usuario' | 'admin';
  acceptTerms?: boolean;
}

export interface UserDelete {
  id: string;
}
