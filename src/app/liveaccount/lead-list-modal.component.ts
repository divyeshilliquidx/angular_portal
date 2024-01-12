
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
  leads_per_page: number = 10;
  search_firstname: string = '';
  search_lastname: string = '';
  search_leadsource: string = '';
  search_dob: string = '';

  constructor(private httpClient: HttpClient, public modalRef: MdbModalRef<LeadListModalComponent>) { }


  selectedLead(leadid: string, firstname: string, lastname: string): void {
    // Emit the selected data to the parent component
    this.modalRef.close({ leadid, firstname, lastname });
  }
  searchLead(search_firstname: string, search_lastname: string, search_leadsource: string, search_dob: string): void {
    console.log(search_leadsource);
    // Get the search criteria
    const searchFirstNameInput = document.getElementById('search_firstname') as HTMLInputElement;
    const searchLastNameInput = document.getElementById('search_lastname') as HTMLInputElement;
    const leadsPerPage = document.getElementById('leads_per_page') as HTMLInputElement;
    const leads_per_page = leadsPerPage.value.trim();

    // if (searchFirstNameInput || searchLastNameInput) {
    const searchFirstName = searchFirstNameInput.value.trim();
    const searchLastName = searchLastNameInput.value.trim();

    // Construct the base SQL query
    let sqlQuery = `SELECT vtiger_leaddetails.lead_no,vtiger_leaddetails.firstname, vtiger_leaddetails.lastname, vtiger_crmentity.smownerid, vtiger_leaddetails.leadsource, vtiger_leaddetails.leadid, vtiger_crmentity_user_field.starred,vtiger_leaddetails.date_of_birth FROM vtiger_leaddetails INNER JOIN vtiger_crmentity ON vtiger_leaddetails.leadid = vtiger_crmentity.crmid LEFT JOIN vtiger_users ON vtiger_crmentity.smownerid = vtiger_users.id LEFT JOIN vtiger_groups ON vtiger_crmentity.smownerid = vtiger_groups.groupid LEFT JOIN vtiger_crmentity_user_field ON vtiger_leaddetails.leadid = vtiger_crmentity_user_field.recordid AND vtiger_crmentity_user_field.userid=1 `;

    // Check if both search criteria are provided
    if (search_firstname != '' || search_lastname != '' || search_leadsource != '' || search_dob != '') {

      const start_date = new Date(search_dob[0]);
      const start_year = start_date.getFullYear();
      const start_month = (start_date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const start_day = start_date.getDate().toString().padStart(2, '0');

      // Create the formatted string
      const from_date = `${start_year}-${start_month}-${start_day}`;

      const end_date = new Date(search_dob[1]);
      const end_year = end_date.getFullYear();
      const end_month = (end_date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const end_day = end_date.getDate().toString().padStart(2, '0');

      // Create the formatted string
      const to_date = `${end_year}-${end_month}-${end_day}`;

      // If either criteria exists, add WHERE clause to the SQL query
      sqlQuery += ` WHERE 1`;

      if (search_firstname) {
        sqlQuery += ` AND vtiger_leaddetails.firstname LIKE '${search_firstname}%'`;
      }

      if (search_lastname) {
        sqlQuery += ` AND vtiger_leaddetails.lastname LIKE '${search_lastname}%'`;
      }

      if (search_leadsource) {
        sqlQuery += ` AND vtiger_leaddetails.leadsource = '${search_leadsource}'`;
      }

      if (search_dob[0] && search_dob[1]) {
        sqlQuery += ` AND vtiger_leaddetails.date_of_birth BETWEEN '${from_date}' AND '${to_date}'`;
      }
    }
    sqlQuery += ` ORDER BY vtiger_crmentity.modifiedtime DESC LIMIT ${leads_per_page}`;


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


