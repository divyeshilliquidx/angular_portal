
// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { HttpService } from '../services/http.service';
// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-ticket-list',
//   templateUrl: './ticket-list.component.html',
//   styleUrls: ['../../../node_modules/ngx-toastr/toastr.css', './ticket-list.component.css'],
//   encapsulation: ViewEncapsulation.None,
// })
// export class TicketListComponent implements OnInit {
//   user_id: string = '';
//   ticketData: any; // Define a property to store API response data


//   constructor(
//     private router: Router,
//     private httpService: HttpService,
//     private toastr: ToastrService
//   ) { }

//   ngOnInit() {
//     this.user_id = localStorage.getItem('user_id') ?? '';

//     const loginApiUrl = 'http://localhost:3000/fetchReferenceRecords';
//     const loginPayload = {
//       module: "HelpDesk",
//       page: 1,
//       search_params: [[]],
//       crmid: 0,
//       contactid: this.user_id
//     };
//     this.httpService.post(loginApiUrl, loginPayload).subscribe(
//       (response) => {
//         this.ticketData = response; // Assign API response data to the property
//         this.toastr.success('Successfully Load');
//       },
//       (errorRes) => {
//         const errorMessage = errorRes.error.message;
//         this.toastr.error(errorMessage);
//       }
//     );
//   }
// }



import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['../../../node_modules/ngx-toastr/toastr.css', './ticket-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketListComponent implements OnInit {

  user_id: string = '';
  ticketData: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalRecords: number = 0;
  totalPagesArray: any[] = [];
  perPageRecord: number = 10;
  componentname: string = 'ticket';

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
      this.fetchTickets(this.currentPage, this.perPageRecord);
    }
  }

  createNumberArray(limit: number) {
    return Array.from({ length: limit }, (_, index) => index + 1);
  }

  fetchTickets(page: number, perPage: number) {
    const requestURL = 'http://localhost:3000/fetchReferenceRecords';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Set the content type to JSON
    });
    const loginPayload = {
      module: 'HelpDesk',
      page: page,
      search_params: [[]], //["title", 'c', 'ticket data']
      crmid: 0,
      per_page: perPage,
      contactid: this.user_id,
    };


    this.http.post(requestURL, loginPayload, { headers }).subscribe({
      next: (response: any) => {
        this.ticketData = response.result;
        this.totalPages = response.total_pages;
        this.totalRecords = response.total_records;
        this.totalPagesArray = this.createNumberArray(response.total_pages);
      },
      error: (errorRes) => {
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

    // this.httpService.post(loginApiUrl, loginPayload).subscribe(
    //   (response: any) => {
    //     this.ticketData = response.result;
    //     this.totalPages = response.total_pages;
    //     this.totalRecords = response.total_records;
    //     this.totalPagesArray = this.createNumberArray(response.total_pages);
    //     //this.toastr.success('Successfully Loaded');
    //   },
    //   (errorRes) => {
    //     const errorMessage = errorRes.error.message;
    //     this.toastr.error(errorMessage);
    //   }
    // );
  }
  onPageChange() {
    this.fetchTickets(this.currentPage, this.perPageRecord);
  }
  onPerPageChange() {
    this.fetchTickets(this.currentPage, this.perPageRecord);
  }
  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-scrollable',
    })
  }
}

