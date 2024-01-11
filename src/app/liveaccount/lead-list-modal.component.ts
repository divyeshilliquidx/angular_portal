
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
  searchLead(): void {
    // Get the search criteria
    const searchFirstNameInput = document.getElementById('search_firstname') as HTMLInputElement;
    const searchLastNameInput = document.getElementById('search_lastname') as HTMLInputElement;
    const leadsPerPage = document.getElementById('leads_per_page') as HTMLInputElement;
    const leads_per_page = leadsPerPage.value.trim();

    // if (searchFirstNameInput || searchLastNameInput) {
    const searchFirstName = searchFirstNameInput.value.trim();
    const searchLastName = searchLastNameInput.value.trim();

    // Construct the base SQL query
    let sqlQuery = `SELECT leadid, lead_no, firstname, lastname FROM vtiger_leaddetails `;

    // Check if both search criteria are provided
    if (searchFirstName || searchLastName) {
      // If either criteria exists, add WHERE clause to the SQL query
      sqlQuery += ` WHERE 1`;

      if (searchFirstName) {
        sqlQuery += ` AND firstname LIKE '${searchFirstName}%'`;
      }

      if (searchLastName) {
        sqlQuery += ` AND lastname LIKE '${searchLastName}%'`;
      }
    }
    sqlQuery += ` LIMIT 10`;


    // Perform the search based on the constructed SQL query
    const apiUrl = 'http://localhost:3000/fetchCRMRecordByQuery';
    const query = {
      module: 'Reports',
      query: [sqlQuery]
    };

    this.httpClient.post<any>(apiUrl, query).subscribe((response: any) => {
      if (response.success) {
        this.leadData = response.data;
      }
    });
  }

  ngOnInit() {
  }

}


