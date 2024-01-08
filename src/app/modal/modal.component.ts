// modal.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="btn-close" (click)="closeModal()" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal Content Goes Here</p>
      </div>
    </div>
  `,
})
export class ModalComponent {
  closeModal() {
    // You can perform any necessary actions before closing the modal
  }
}