
// C:\xampp8.2\htdocs\vt_portal_angular\src\app\liveaccount\lead-list-modal.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-lead-list-modal',
  templateUrl: './lead-list-modal.component.html',
  styleUrls: ['./lead-list-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class LeadListModalComponent implements OnInit {
  //leadList: any[] = [];
  leadData: any = {};

  constructor(private httpClient: HttpClient, public modalRef: MdbModalRef<LeadListModalComponent>) { }


  selectedLead(leadid: string, firstname: string, lastname: string): void {
    // Emit the selected data to the parent component
    this.modalRef.close({ leadid, firstname, lastname });
  }
  ngOnInit() {
  }

}


