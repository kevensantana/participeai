import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatButtonModule } from '@angular/material/button';

import { UserRegister } from '../models/user.model';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { NotificationService } from '../services/notification/notification.service';
import { UserService } from '../services/user.service';
import { ValidationService } from '../services/error-handler/validation.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatSnackBarModule, MatButtonModule], 
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
  
 errors: { [key: string]: string | null } = {
  name: null,
  cpf: null,
  birthDate: null,
  email: null,
  password: null,
  confirmPassword: null,
  acceptTerms: null,
};


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

   ngOnInit(): void {
    this.clearErrors();
  }

  constructor(
    private router: Router,   
    private errorHandler: ErrorHandlerService,
    private notification: NotificationService,
    private userService: UserService,
    private validator: ValidationService
  ) {} 


    showPassword = false;

    passwordLengthValid = false;
    passwordHasLetter = false;
    passwordHasNumber = false;
    passwordHasSpecial = false;
    isTypingPassword = false;
    showConfirmPassword = false;
    isTypingConfirm = false;
    senhaCoincide: boolean | null = null;

 
  validatePassword(): void {
    const pwd = this.user.password || '';
    this.passwordLengthValid = pwd.length >= 8;
    this.passwordHasLetter = /[A-Z]/.test(pwd);
    this.passwordHasNumber = /[0-9]/.test(pwd);
    this.passwordHasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    const allValid = this.passwordLengthValid && this.passwordHasLetter && this.passwordHasNumber && this.passwordHasSpecial;
    if (!allValid) {
      this.notification.show('Senha fraca. Deve conter no mínimo 8 caracteres, letras, números e caractere especial.');
    }

  }

  validateConfirmPassword() {
    const senha = this.user.password;
    const confirmacao = this.user.confirmPassword;

    if (!senha || !confirmacao) {
      this.senhaCoincide = null;
      return;
    }

    const iguais = senha === confirmacao;
    this.senhaCoincide = iguais;

    if (!iguais) {
      this.notification.show('As senhas não coincidem.');
    }

  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }


  removeError(field: keyof typeof this.errors): void {
    if (this.errors[field]) {
      this.errors[field] = null;
    }
  }

 register(): void {
  const result = this.validator.validateUser(this.user);
  this.errors = result.errors;
  if (!result.valid) {
    this.notification.show(Object.values(result.errors)[0] as string);
    return;
  }

 this.userService.getByEmail(this.user.email).subscribe({
  next: (users: UserRegister[]) => {
    // if (users.length > 0) {
    //   this.notification.show('Este e-mail já está em uso. Por favor, utilize outro e-mail.', 'Ok');
    //   return;
    // }
    // ...O if acima foi comentado para evitar a validação de e-mail duplicado(Não ta funcionando no backend ainda)
      this.userService.create(this.user).subscribe({
        next: () => {
          this.notification.show('🎉 Cadastro realizado! Seu cadastro foi concluído com sucesso.', 'Ok');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          this.errorHandler.handleError(err, 'Erro ao cadastrar usuário');
          this.notification.show('Ocorreu um erro inesperado ao tentar cadastrar. Tente novamente mais tarde.', 'Ok');
        }
      });
    },
    error: (err: any) => {
      this.errorHandler.handleError(err, 'Erro na validação do e-mail');
      this.notification.show('Não foi possível verificar o e-mail. Verifique sua conexão e tente novamente.', 'Ok');
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