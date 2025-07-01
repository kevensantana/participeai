import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tabela-usuarios',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['../admin.component.css'],
  template: `
    <table>
      <thead>
        <tr>
          <th>Nome</th><th>Email</th><th>CPF</th><th>Data Nasc.</th><th>Status</th><th>Data Criação</th><th>Nível de Acesso</th><th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let usuario of usuarios">
          <td>{{ usuario.name || '-' }}</td>
          <td>{{ usuario.email || '-' }}</td>
          <td>{{ usuario.cpf || '-' }}</td>
          <td>{{ usuario.birthDate || '-' }}</td>
          <td>{{ usuario.status || '-' }}</td>
          <td>{{ usuario.createdAt || '-' }}</td>
          <td>{{ usuario.role || '-' }}</td>
          <td class="actions-buttons">
            <button (click)="editar.emit(usuario)"><i class="fas fa-edit"></i></button>
            <button (click)="deletar.emit(usuario.id)"><i class="fas fa-trash-alt"></i></button>
            <button (click)="info.emit(usuario)"><i class="fas fa-info-circle"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class TabelaUsuariosComponent {
  @Input() usuarios: any[] = [];
  @Output() editar = new EventEmitter<any>();
  @Output() deletar = new EventEmitter<number>();
  @Output() info = new EventEmitter<any>();
}
