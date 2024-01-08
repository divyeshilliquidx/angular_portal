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
    const loginPayload = {
      module: 'LiveAccount',
      page: page,
      search_params: [[]],
      crmid: 0,
      per_page: perPage,
      contactid: this.user_id,
    };


    this.http.post(requestURL, loginPayload, { headers }).subscribe({
      next: (response: any) => {
        this.records = response.result;
        this.totalPages = response.total_pages;
        this.totalRecords = response.total_records;
        this.totalPagesArray = this.createNumberArray(response.total_pages);
      }, error: (errorRes) => {
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
    //     this.records = response.result;
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
