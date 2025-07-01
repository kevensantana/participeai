import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent {
  errorMessage: string | null = null;
  successMessage: string | null = null;

  company = {
    legalName: '',
    tradeName: '',
    cnpj: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    responsiblePerson: '',
    responsibleCpf: '',
    companySize: '' as 'MEI' | 'ME' | 'EPP' | 'Média' | 'Grande',
    acceptTerms: false
  };

  constructor(private http: HttpClient, private router: Router, private companyService: CompanyService) {}

  register() {
  
    if (this.company.password !== this.company.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      this.successMessage = null;
      return;
    }

    if (!this.company.acceptTerms) {
      this.errorMessage = 'Você precisa aceitar os termos de uso.';
      this.successMessage = null;
      return;
    }

    
    this.companyService.adicionarEmpresa(this.company).subscribe({
      next: () => {
        this.successMessage = 'Cadastro de empresa realizado com sucesso!';
        this.errorMessage = null;


        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Erro ao cadastrar. Tente novamente.';
        this.successMessage = null;
      }
    });
  }

  onlyNumber($event: KeyboardEvent) {
    const key = $event.key;
    if (!/[0-9]/.test(key)) {
      $event.preventDefault();
    }
  }

  formatCnpj() {
    this.company.cnpj = this.company.cnpj
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1/$2')
      .replace(/(\d{4})(\d+)/, '$1-$2');
  }
}
