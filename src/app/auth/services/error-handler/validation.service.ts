// src/app/shared/services/validation.service.ts
import { Injectable } from '@angular/core';
import { UserRegister } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  validateUser(user: UserRegister): { valid: boolean; errors: any } {
    const errors: any = {};
    let valid = true;

    if (!user.name || user.name.length < 3) {
      errors.name = 'Nome inválido. Deve ter pelo menos 3 caracteres.';
      valid = false;
    }

    if (!user.cpf || user.cpf.replace(/\D/g, '').length !== 11) {
      errors.cpf = 'CPF inválido. O formato deve ser XXX.XXX.XXX-XX.';
      valid = false;
    }

    if (!user.birthDate) {
      errors.birthDate = 'Data de nascimento é obrigatória.';
      valid = false;
    }

    if (!user.email || !this.isValidEmail(user.email)) {
      errors.email = 'Formato de email inválido.';
      valid = false;
    }

    if (!user.password || user.password.length < 8) {
      errors.password = 'A senha deve ter pelo menos 8 caracteres.';
      valid = false;
    }

    if (user.password !== user.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem.';
      valid = false;
    }

    if (!user.acceptTerms) {
      errors.acceptTerms = 'Você precisa aceitar os termos de uso para prosseguir.';
      valid = false;
    }

    return { valid, errors };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
