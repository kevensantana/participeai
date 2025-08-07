import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  constructor(private notification: NotificationService) {}

  handleError(error: unknown, contextMessage: string = 'Erro inesperado') {
    if (error instanceof HttpErrorResponse) {
      const mensagem = this.getHttpErrorMessage(error);
      this.notification.show(`${contextMessage}: ${mensagem}`);
    } else {
      this.notification.show(`${contextMessage}: erro desconhecido`);
    }

    console.error('Detalhes do erro:', error);
  }

  private getHttpErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return error.error.message;
    } else {
      return `(${error.status}) ${error.statusText || 'Erro no servidor'}`;
    }
  }
}
