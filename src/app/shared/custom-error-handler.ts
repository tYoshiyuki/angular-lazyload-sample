import { ErrorHandler } from '@angular/core';

export class CustomErrorHandler implements ErrorHandler {
  handleError(e :any) {
    console.error('🙀CustomErrorHandler - handleError🙀', e);
  }
}
