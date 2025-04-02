import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css'],
  standalone: true, // Mark this as standalone if using Angular 14+
})
export class AppConfirmPopupComponent {
  @Input() message: string = '';  // Message passed from parent component
  @Output() confirm = new EventEmitter<boolean>();  // Event emitted when user confirms or cancels

  // Method to emit the confirm event
  confirmAction(confirmed: boolean) {
    this.confirm.emit(confirmed);
  }
}
