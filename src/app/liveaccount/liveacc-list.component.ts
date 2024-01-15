// import { Component, ViewEncapsulation } from '@angular/core';

// @Component({
//   selector: 'app-liveacc-list',
//   templateUrl: './liveacc-list.component.html',
//   styleUrls: ['./liveacc-list.component.css'],
//   encapsulation: ViewEncapsulation.None,
// })
// export class LiveaccListComponent {

// }


import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-liveacc-list',
  templateUrl: './liveacc-list.component.html',
  styleUrls: ['../../../node_modules/ngx-toastr/toastr.css', './liveacc-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LiveaccListComponent implements OnInit {

  user_id: string = '';
  records: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;
  totalPagesArray: any[] = [];
  perPageRecord: number = 10;
  componentname: string = 'liveaccount';

  subject: string = "";
  contactId: string = "";
  leadId: string = "";
  decimalTest: string = "";
  integerTest: string = "";
  percentageTest: string = "";
  currencyTest: string = "";
  dateTestStart: string = ""; //date ymd formate
  dateTestEnd: string = ""; //date ymd formate
  emailTest: string = "";
  picklistTest: string = "";
  checkboxTest: string = "";
  assignedUser: string = "";
  conditions: any[] = [];

  modalRef: MdbModalRef<ModalComponent> | null = null;
  constructor(
    private router: Router,
    private httpService: HttpService,
    private toastr: ToastrService,
    private modalService: MdbModalService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id') ?? '';
    if (!this.user_id || this.user_id == '') {
      this.router.navigate(['/login']);
    } else {
      this.fetchRecordData(this.currentPage, this.perPageRecord);
    }
  }

  createNumberArray(limit: number) {
    return Array.from({ length: limit }, (_, index) => index + 1);
  }

  fetchRecordData(page: number, perPage: number) {
    const requestURL = 'http://localhost:3000/fetchReferenceRecords';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
    });

    // Build the payload with the conditions array
    const payload = {
      module: 'LiveAccount',
      page: page,
      search_params: [[]],
      crmid: 0,
      per_page: perPage,
      contactid: this.user_id,
      add_extra_columns: ",(SELECT CONCAT(vtiger_leaddetails.firstname,' ',vtiger_leaddetails.lastname) FROM vtiger_leaddetails WHERE vtiger_leaddetails.leadid = vtiger_liveaccount.leadid) leadid_display,(SELECT vtiger_account.accountname FROM vtiger_account WHERE vtiger_account.accountid = vtiger_liveaccount.accountid) accountid_display"
    };

    this.http.post(requestURL, payload, { headers }).subscribe({
      next: (response: any) => {
        this.records = response.result;
        this.totalPages = response.total_pages;
        this.totalRecords = response.total_records;
        this.totalPagesArray = this.createNumberArray(response.total_pages);
      }, error: (errorRes: any) => {
        if (errorRes.status === 0) {
          const errorMessage = errorRes.message;
          this.toastr.error(errorMessage);
        } else {
          // Handle other HTTP errors
          const errorMessage = errorRes.error.message;
          this.toastr.error(errorMessage);
        }
      }
    });
  }

  searchRecordList(subject: string, leadId: string, decimalTest: string, integerTest: string, percentageTest: string, currencyTest: string, dateTestStart: string, emailTest: string, picklistTest: string, checkboxTest: string, assignedUser: string, perPageRecord: number, currentPage: number) {
    const conditions = [];

    // Add conditions based on whether the values are not blank
    if (subject != '') {
      conditions.push(["subject", "like", subject]);
    }
    if (leadId != '') {
      conditions.push(["leadid", "like", leadId]);
    }
    if (decimalTest != '') {
      conditions.push(["decimal_test", "equel", decimalTest]);
    }
    if (integerTest != '') {
      conditions.push(["decimal_test", "equel", integerTest]);
    }
    if (percentageTest != '') {
      conditions.push(["percentage_test", "equel", percentageTest]);
    }
    if (currencyTest != '') {
      conditions.push(["currency_test", "between", currencyTest]);
    }
    if (dateTestStart != '') {

      const start_date = new Date(dateTestStart[0]);
      const start_year = start_date.getFullYear();
      const start_month = (start_date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const start_day = start_date.getDate().toString().padStart(2, '0');

      // Create the formatted string
      const from_date = `${start_year}-${start_month}-${start_day}`;

      const end_date = new Date(dateTestStart[1]);
      const end_year = end_date.getFullYear();
      const end_month = (end_date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const end_day = end_date.getDate().toString().padStart(2, '0');

      // Create the formatted string
      const to_date = `${end_year}-${end_month}-${end_day}`;

      conditions.push(["date_test", "between", `${from_date},${to_date}`]);
    }
    if (emailTest != '') {
      conditions.push(["email_test", "like", emailTest]);
    }
    if (checkboxTest != '') {
      conditions.push(["checkbox_test", "equel", checkboxTest]);
    }
    if (picklistTest != '') {
      conditions.push(["picklist_test", "equel", picklistTest]);
    }
    if (assignedUser != '') {
      conditions.push(["assigned_user_id", "like", assignedUser]);
    }

    const requestURL = 'http://localhost:3000/fetchReferenceRecords';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
    });

    const payload = {
      module: 'LiveAccount',
      page: currentPage,
      search_params: conditions.length > 0 ? [conditions] : [],
      crmid: 0,
      per_page: perPageRecord,
      contactid: this.user_id,
      add_extra_columns: ",(SELECT CONCAT(vtiger_leaddetails.firstname,' ',vtiger_leaddetails.lastname) FROM vtiger_leaddetails WHERE vtiger_leaddetails.leadid = vtiger_liveaccount.leadid) leadid_display,(SELECT vtiger_account.accountname FROM vtiger_account WHERE vtiger_account.accountid = vtiger_liveaccount.accountid) accountid_display"
    };


    this.http.post(requestURL, payload, { headers }).subscribe({
      next: (response: any) => {
        this.records = response.result;
        this.totalPages = response.total_pages;
        this.totalRecords = response.total_records;
        this.totalPagesArray = this.createNumberArray(response.total_pages);
      }, error: (errorRes: any) => {
        if (errorRes.status === 0) {
          const errorMessage = errorRes.message;
          this.toastr.error(errorMessage);
        } else {
          // Handle other HTTP errors
          const errorMessage = errorRes.error.message;
          this.toastr.error(errorMessage);
        }
      }
    });
  }

  onPageChange() {
    this.fetchRecordData(this.currentPage, this.perPageRecord);
  }
  onPerPageChange() {
    this.fetchRecordData(this.currentPage, this.perPageRecord);
  }
  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-scrollable',
    })
  }
}
