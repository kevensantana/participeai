export interface Admin {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  accessLevel: 'basic' | 'super';
}
export interface AdminLogin {
  email: string;
  password: string;
}
export interface AdminRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  accessLevel: 'basic' | 'super';
}