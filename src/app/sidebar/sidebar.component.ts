import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {

  isTicketOpen = false;
  isDocumentOpen = false;

  toggleTicket() {
    this.isTicketOpen = !this.isTicketOpen;
    this.isDocumentOpen = false; // Close other menu if open
  }

  toggleDocument() {
    this.isDocumentOpen = !this.isDocumentOpen;
    this.isTicketOpen = false; // Close other menu if open
  }
}
