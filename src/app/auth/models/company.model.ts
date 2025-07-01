export interface Company {
  id: string;
  legalName: string;             
  tradeName: string;             
  cnpj: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  responsiblePerson: string;
  responsibleCpf: string;
  companySize: 'MEI' | 'ME' | 'EPP' | 'Média' | 'Grande'; 
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
  acceptTerms: boolean;
}

