import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  isSuccessMessage: boolean = false;
  successMessage: string = '';
  isErrorMessage: boolean = false;
  errorMessage: string = '';

  showSuccessMessage(message: string) {
    this.isSuccessMessage = true;
    this.successMessage = message;

    setTimeout(() => {
      this.closeSuccessMessage();
    }, 3000);
  }

  closeSuccessMessage() {
    this.isSuccessMessage = false;
    this.successMessage = '';
  }

  showErrorMessage(message: string) {
    this.isErrorMessage = true;
    this.errorMessage = message;

    setTimeout(() => {
      this.closeErrorMessage();
    }, 3000);
  }

  closeErrorMessage() {
    this.isErrorMessage = false;
    this.errorMessage = '';
  }
}
