import { User } from './user.model';
import { Company } from './company.model';
import { Admin } from './admin.model';

export type AuthResponse = {
  type: 'user' | 'company' | 'admin';
  data: User | Company | Admin;
};
export type AuthResponseError = {
  error: string;
  message: string;
  statusCode: number;
};