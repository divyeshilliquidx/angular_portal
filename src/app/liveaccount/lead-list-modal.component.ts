// import { Component, ViewEncapsulation } from '@angular/core';

// @Component({
//   selector: 'app-lead-list-modal',
//   templateUrl: './lead-list-modal.component.html',
//   styleUrls: ['./lead-list-modal.component.css'],
//   encapsulation: ViewEncapsulation.None,
// })
// export class LeadListModalComponent {

// }

// lead-list-modal.component.ts

// lead-list-modal.component.ts

// C:\xampp8.2\htdocs\vt_portal_angular\src\app\liveaccount\lead-list-modal.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lead-list-modal',
  templateUrl: './lead-list-modal.component.html',
  styleUrls: ['./lead-list-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class LeadListModalComponent implements OnInit {
  leadList: any[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.loadLeadList();
  }

  loadLeadList() {
    const apiUrl = 'http://localhost:3000/fetchCRMRecordByQuery';
    const query = {
      module: 'Reports',
      query: ["SELECT leadid,lead_no,firstname,lastname FROM `vtiger_leaddetails`"]
    };

    this.httpClient.post<any>(apiUrl, query).subscribe((response: any) => {
      if (response.success) {

        this.leadList = response.data;
      }
    });
  }
}


