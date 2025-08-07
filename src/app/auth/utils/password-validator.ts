export class PasswordValidator {
  static isStrong(password: string): boolean {
    const lengthValid = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return lengthValid && hasUpperCase && hasNumber && hasSpecial;
  }

  static doPasswordsMatch(pass: string, confirm: string): boolean {
    return pass === confirm;
  }
}
