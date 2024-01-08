import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {

  isTicketOpen = false;
  isLiveaccountOpen = false;
  isDocumentOpen = false;

  toggleTicket() {
    this.isTicketOpen = !this.isTicketOpen;
    this.closeOtherMenus('isTicketOpen');
  }

  toggleDocument() {
    this.isDocumentOpen = !this.isDocumentOpen;
    this.closeOtherMenus('isDocumentOpen');
  }

  toggleLiveaccount() {
    this.isLiveaccountOpen = !this.isLiveaccountOpen;
    this.closeOtherMenus('isLiveaccountOpen');
  }

  private closeOtherMenus(currentMenu: string) {
    if (currentMenu !== 'isTicketOpen') {
      this.isTicketOpen = false;
    }

    if (currentMenu !== 'isLiveaccountOpen') {
      this.isLiveaccountOpen = false;
    }

    if (currentMenu !== 'isDocumentOpen') {
      this.isDocumentOpen = false;
    }
  }
}
