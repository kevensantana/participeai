import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tabela-company',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['../admin.component.css'],
  template: `
     <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Nome Fantasia</th>
          <th>CNPJ</th>
          <th>Email</th>
          <th>Responsável</th>
          <th>Porte</th>
          <th>Cidade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let company of companies">
          <td>{{ company.legalName || '-' }}</td>
          <td>{{ company.tradeName || '-' }}</td>
          <td>{{ company.cnpj || '-' }}</td>
          <td>{{ company.email || '-' }}</td>
          <td>{{ company.responsiblePerson || '-' }}</td>
          <td>{{ company.companySize || '-' }}</td>
          <td>{{ company.address?.city || '-' }}</td>
           <td class="actions-buttons">
            <button (click)="editar.emit(companies)"><i class="fas fa-edit"></i></button>
            <button (click)="deletar.emit(company.id)"><i class="fas fa-trash-alt"></i></button>
            <button (click)="info.emit(companies)"><i class="fas fa-info-circle"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class TabelacompanyComponent {
  @Input() companies: any[] = [];
  @Output() editar = new EventEmitter<any>();
  @Output() deletar = new EventEmitter<number>();
  @Output() info = new EventEmitter<any>();
}
