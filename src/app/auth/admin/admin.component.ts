import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../services/company.service';
import { TabelaUsuariosComponent } from './components/tabela-user.component';
import { TabelacompanyComponent } from "./components/tabela-company.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    TabelaUsuariosComponent, 
    TabelacompanyComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  usuarios: any[] = [];
  companies: any[] = [];
  usuariosFiltrados: any[] = [];
  empresasFiltradas: any[] = [];

  mostrarPopup: boolean = false;
  mostrarPopupInfo: boolean = false;
  mostrarPopupEditar: boolean = false;
  usuarioEditando: any = null;
  usuarioSelecionado: any = null;

  busca: string = '';
  buscaEmpresa: string = '';

  novoUsuario: any = {
    name: '',
    email: '',
    cpf: '',
    birthDate: '',
    role: 'user',
    acceptTerms: false,
  };

  
  sessaoAtual: 'consumer' | 'company' = 'consumer';


  constructor(private userService: UserService, private companyService: CompanyService) {}
  
  ngOnInit() {
    this.carregarUsuarios();
    this.carregarEmpresas();
  }


  carregarUsuarios() {
    this.userService.getAll().subscribe((data) => {
      this.usuarios = data;
      this.usuariosFiltrados = data;
    });
  }

  carregarEmpresas() {
    this.companyService.listarEmpresas().subscribe((data) => {
      this.companies = data;
      this.empresasFiltradas = data;
    });
  }



  filtrarUsuarios() {
    if (this.busca.trim() === '') {
      this.usuariosFiltrados = [...this.usuarios];
    } else {
      const buscaNormalizada = this.busca.toLowerCase();
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.name.toLowerCase().includes(buscaNormalizada) ||
        usuario.cpf.includes(buscaNormalizada)  
      );
    }
  }

  filtrarEmpresas() {
    const busca = this.buscaEmpresa.toLowerCase();
    this.empresasFiltradas = this.companies.filter(e =>
      (e.legalName && e.legalName.toLowerCase().includes(busca)) ||
      (e.cnpj && e.cnpj.includes(busca))
    );
  }

  abrirPopup() {
    this.mostrarPopup = true;
    console.log(this.mostrarPopup);
  }

  fecharPopup() {
    this.mostrarPopup = false;
  }

  salvarUsuario() {
    this.userService.create(this.novoUsuario).subscribe(() => {
      this.carregarUsuarios();
      this.fecharPopup(); 
    });
  }
   

  editarUsuario(usuario: any) {
    this.usuarioEditando = { ...usuario };
    this.mostrarPopupEditar = true;
  }
  
  fecharPopupEditar() {
    this.mostrarPopupEditar = false;
  }
  
  salvarEdicao() {
    console.log('Salvando edições do usuário:', this.usuarioEditando);
    this.userService.update(this.usuarioEditando.id, this.usuarioEditando).subscribe(
      (data) => {
        console.log('Usuário atualizado com sucesso:', data);
        this.carregarUsuarios();
        this.fecharPopupEditar();
      },
      (error) => {
        console.error('Erro ao salvar usuário:', error);
      }
    );
  }

  deletarUsuario(id: string) {
    this.userService.delete(id).subscribe(() => {
      this.carregarUsuarios();
    });
  }

  verMais(usuario: any) {
    this.usuarioSelecionado = usuario;
    this.mostrarPopupInfo = true;
  }

  fecharPopupInfo() {
    this.mostrarPopupInfo = false;
  }

}
