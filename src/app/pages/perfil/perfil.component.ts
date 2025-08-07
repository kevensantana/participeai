import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../auth/services/user.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: any;
  mame: string = '';
  email: string = '';
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';
  confirmarExclusao: boolean = false;

  formularioAtivo: string = 'informacoes';

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarUsuario();
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  mostrarFormulario(formulario: string, event: Event) {
    event.preventDefault(); // evita recarregar a página
    this.formularioAtivo = formulario;
  }

  carregarUsuario() {
    const idUsuario = '4a87'; 
    if (!idUsuario) { ''
      this.showMessage('Usuário não encontrado.');
      return;
    }
    this.userService.getById(idUsuario).subscribe({
      next: (data) => {
        this.usuario = data;
        if (!this.usuario.residencia) {
          this.usuario.residencia = {
            cep: '',
            logradouro: '',
            numero: '',
            bairro: '',
            complemento: '',
            cidade: '',
            estado: ''
          };
        }
      },
      error: () => this.showMessage('Erro ao carregar usuário.')
    });
  }

  salvarInformacoes() {
    if (!this.usuario || !this.usuario.id) return;
    this.userService.update(this.usuario.id, this.usuario).subscribe({
      next: () => this.showMessage('Informações atualizadas com sucesso!'),
      error: () => this.showMessage('Erro ao salvar informações.')
    });
  }

  salvarResidencia() {
    if (!this.usuario || !this.usuario.id) return;
    this.userService.update(this.usuario.id, { residencia: this.usuario.residencia }).subscribe({
      next: () => this.showMessage('Residência atualizada com sucesso!'),
      error: () => this.showMessage('Erro ao salvar residência.')
    });
  }

  alterarSenha() {
    if (this.novaSenha !== this.confirmarSenha) {
      this.showMessage('As senhas não conferem!');
      return;
    }
    if (!this.usuario || !this.usuario.id) return;
    this.userService.update(this.usuario.id, { senha: this.novaSenha }).subscribe({
      next: () => {
        this.showMessage('Senha alterada com sucesso!');
        this.senhaAtual = '';
        this.novaSenha = '';
        this.confirmarSenha = '';
      },
      error: () => this.showMessage('Erro ao alterar senha.')
    });
  }

  deletarConta() {
    if (!this.confirmarExclusao) {
      this.showMessage('Confirme a exclusão da conta.');
      return;
    }
    if (!this.usuario || !this.usuario.id) return;
    this.userService.delete(this.usuario.id).subscribe({
      next: () => this.showMessage('Conta deletada com sucesso!'),
      error: () => this.showMessage('Erro ao deletar conta.')
    });
  }
}
