import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importa MatSnackBar e MatSnackBarModule
import { MatButtonModule } from '@angular/material/button';

import { UserRegister } from '../models/user.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSnackBarModule, MatButtonModule], // Adiciona MatSnackBarModule aqui
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserRegister = {
    name: '',
    cpf: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
    status: 'ativo',
    createdAt: new Date().toISOString(),
    role: 'usuario',
    acceptTerms: false
  };

  errors: {
    name: string | null;
    cpf: string | null;
    birthDate: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
    acceptTerms: string | null;
  } = {
    name: null,
    cpf: null,
    birthDate: null,
    email: null,
    password: null,
    confirmPassword: null,
    acceptTerms: null,
  };

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {} 

  ngOnInit() {
    this.clearErrors();
  }

  // Método para exibir notificações com MatSnackBar
  private showNotification(message: string, action: string = 'Fechar') {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private validateForm(): boolean {
    this.clearErrors();
    let isValid = true;
    let errorMessages: string[] = [];

    if (!this.user.name || this.user.name.length < 3) {
      this.errors.name = 'Nome inválido. Deve ter pelo menos 3 caracteres.';
      errorMessages.push(this.errors.name);
      isValid = false;
    }

    if (!this.user.cpf || this.user.cpf.replace(/\D/g, '').length !== 11) {
      this.errors.cpf = 'CPF inválido. O formato deve ser XXX.XXX.XXX-XX.';
      errorMessages.push(this.errors.cpf);
      isValid = false;
    }

    if (!this.user.birthDate) {
      this.errors.birthDate = 'Data de nascimento é obrigatória.';
      errorMessages.push(this.errors.birthDate);
      isValid = false;
    }

    if (!this.user.email) {
      this.errors.email = 'Email é obrigatório.';
      errorMessages.push(this.errors.email);
      isValid = false;
    } else if (!this.isValidEmail(this.user.email)) {
      this.errors.email = 'Formato de email inválido.';
      errorMessages.push(this.errors.email);
      isValid = false;
    }

    if (!this.user.password) {
      this.errors.password = 'Senha é obrigatória.';
      errorMessages.push(this.errors.password);
      isValid = false;
    } else if (this.user.password.length < 6) {
      this.errors.password = 'A senha deve ter pelo menos 6 caracteres.';
      errorMessages.push(this.errors.password);
      isValid = false;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.errors.confirmPassword = 'As senhas não coincidem.';
      errorMessages.push(this.errors.confirmPassword);
      isValid = false;
    }

    if (!this.user.acceptTerms) {
      this.errors.acceptTerms = 'Você precisa aceitar os termos de uso para prosseguir.';
      errorMessages.push(this.errors.acceptTerms);
      isValid = false;
    }

    if (!isValid) {
      // Exibe a primeira mensagem de erro no snackbar para manter a interface limpa
      this.showNotification(`Erro no Cadastro: ${errorMessages[0]}`);
    }

    return isValid;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  clearErrors(): void {
    this.errors = {
      name: null,
      cpf: null,
      birthDate: null,
      email: null,
      password: null,
      confirmPassword: null,
      acceptTerms: null
    };
  }

  removeError(field: keyof typeof this.errors): void {
    if (this.errors[field]) {
      this.errors[field] = null;
    }
  }

  register(): void {
    if (!this.validateForm()) {
      return; // A validação já exibiu a notificação de erro
    }

    this.http.get<UserRegister[]>(`${environment.apiBaseUrl}/users?email=${this.user.email}`).subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.errors.email = 'Este e-mail já está cadastrado.';
          this.showNotification('Este e-mail já está em uso. Por favor, utilize outro e-mail.', 'Ok');
          return;
        }

        this.http.post(`${environment.apiBaseUrl}/users`, this.user).subscribe({
          next: () => {
            this.showNotification('🎉 Cadastro realizado! Seu cadastro foi concluído com sucesso.', 'Ok');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Erro no registro:', err);
            this.showNotification('Ocorreu um erro inesperado ao tentar cadastrar. Tente novamente mais tarde.', 'Ok');
          }
        });
      },
      error: (err) => {
        console.error('Erro na validação do e-mail:', err);
        this.showNotification('Não foi possível verificar o e-mail. Verifique sua conexão e tente novamente.', 'Ok');
      }
    });
  }

  onlyNumber(event: KeyboardEvent): void {
    const key = event.key;
    if (!/[0-9]/.test(key) && key !== 'Backspace' && key !== 'Tab' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
      event.preventDefault();
    }
  }

  formatCpf(): void {
    let raw = this.user.cpf.replace(/\D/g, '');
    if (raw.length > 11) {
      raw = raw.substring(0, 11);
    }

    if (raw.length > 0) {
      this.user.cpf = raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      this.user.cpf = '';
    }
  }


}