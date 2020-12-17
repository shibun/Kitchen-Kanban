import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  isSuccessMessage: boolean = false;
  isErrorMessage: boolean = false;
  errorMessage: string = '';

  showSuccessMessage() {
    this.isSuccessMessage = true;

    setTimeout(() => {
      this.closeSuccessMessage();
    }, 1500);
  }

  closeSuccessMessage() {
    this.isSuccessMessage = false;
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
