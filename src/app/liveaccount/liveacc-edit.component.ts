// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-liveacc-edit',
//   templateUrl: './liveacc-edit.component.html',
//   styleUrls: ['./liveacc-edit.component.css']
// })
// export class LiveaccEditComponent {

// }

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Location } from '@angular/common';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { LeadListModalComponent } from '../liveaccount/lead-list-modal.component';

@Component({
  selector: 'app-liveacc-edit',
  templateUrl: './liveacc-edit.component.html',
  styleUrls: ['../../../node_modules/ngx-toastr/toastr.css', './liveacc-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class LiveaccEditComponent implements OnInit {
  user_id: string = '';
  user_name: string = '';
  user_password: string = '';

  subject: string = '';
  // ticketstatus: string = '';
  // ticketpriorities: string = '';
  // ticketseverities: string = '';
  recordId: number = 0;
  recordData: any = null;

  subjectValid: boolean = true;
  // ticketstatusValid: boolean = true;
  // ticketprioritiesValid: boolean = true;
  // ticketseveritiesValid: boolean = true;

  // searchSubject = new Subject<string>();
  // products: any[] = [];
  // filteredProducts$: Observable<any[]> | undefined;

  searchSubject = new Subject<string>();  // Use Subject<string>
  products: any[] = [];
  filteredProducts$: Observable<any[]> | undefined;
  modalRef: MdbModalRef<LeadListModalComponent> | null = null;
  constructor(
    private router: Router,
    private httpService: HttpService,
    private toastr: ToastrService,
    private http: HttpClient,
    private route: ActivatedRoute,  // Inject ActivatedRoute
    private location: Location,
    private modalService: MdbModalService
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-top-right'; // Adjust position as needed
  }

  openModal() {
    this.modalRef = this.modalService.open(LeadListModalComponent, {
      modalClass: 'modal-lg'
    })
  }

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id') ?? '';
    if (!this.user_id || this.user_id == '') {
      this.router.navigate(['/login']);
    } else {
      const recordId = this.route.snapshot.params['id'];
      if (recordId > 0) {
        this.fetchDataByRecordId(recordId);
      }

    }

    // const requestURL = 'http://localhost:3000/fetchCRMRecordByQuery';
    // const payload = {
    //   "module": "Reports",
    //   "query": ["SELECT vtiger_products.* FROM vtiger_products  INNER JOIN vtiger_crmentity ON vtiger_products.productid = vtiger_crmentity.crmid  WHERE vtiger_crmentity.deleted=0 AND vtiger_products.productid > 0 ORDER BY vtiger_crmentity.modifiedtime DESC"]
    // };

    // this.httpService.post(requestURL, payload).subscribe({
    //   next: (response: any) => {
    //     this.products = response.data;

    //     // this.filteredProducts$ = this.searchSubject.pipe(
    //     //   startWith(''),
    //     //   map(value => this._filter(value))
    //     // );

    //     this.filteredProducts$ = this.searchSubject.pipe(
    //       startWith(''),
    //       map((value: string) => this._filter(value))
    //     );
    //   }, error: (errorRes: any) => {
    //     if (errorRes.status === 0) {
    //       const errorMessage = errorRes.message;
    //       this.toastr.error(errorMessage);
    //     } else {
    //       // Handle other HTTP errors
    //       const errorMessage = errorRes.error.message;
    //       this.toastr.error(errorMessage);
    //     }
    //   }
    // });

  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(product => product.productname.toLowerCase().includes(filterValue));
  }

  onSelect(event: any) {
    // Handle the selected product
    console.log('Selected Product:', event);
  }

  fetchDataByRecordId(recordId: number) {
    const requestURL = 'http://localhost:3000/fetchReferenceRecords';

    const payload = {
      module: 'LiveAccount',
      page: 1,
      search_params: [[]],
      crmid: recordId,
      per_page: 1,
      contactid: this.user_id,
    };

    this.httpService.post(requestURL, payload).subscribe({
      next: (response: any) => {
        if (response.result.length > 0) {
          this.recordData = response;
          this.subject = response.result[0].subject;
          // this.ticketstatus = response.result[0].status;
          // this.ticketpriorities = response.result[0].priority;
          // this.ticketseverities = response.result[0].severity;
        }
      },
      error: (data: any) => { }
    });
  }



  saveRecordData(): void {
    if (!this.subject) {
      this.subjectValid = false;
    } else {
      this.subjectValid = true;
    }

    // if (!this.ticketstatus) {
    //   this.ticketstatusValid = false;
    // } else {
    //   this.ticketstatusValid = true;
    // }

    // if (!this.ticketpriorities) {
    //   this.ticketprioritiesValid = false;
    // } else {
    //   this.ticketprioritiesValid = true;
    // }


    if (this.subjectValid) {
      this.user_id = localStorage.getItem('user_id') ?? '';
      this.user_name = localStorage.getItem('user_name') ?? '';
      this.user_password = localStorage.getItem('user_password') ?? '';

      const requestURL = 'http://localhost:3000/saveRecord';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Set the content type to JSON
      });

      const payload: { [key: string]: string | number } = {
        module: 'LiveAccount',
        values: `{"subject": "${this.subject}","contact_id":"12x${this.user_id}"}`,
        username: this.user_name,
        password: this.user_password
      };

      // Retrieve recordId from route parameters
      const recordId = this.route.snapshot.params['id'];

      // Check if recordId exists before adding it to the payload
      if (recordId > 0) {
        payload['recordId'] = '36x' + recordId;  // Convert to number if needed
      }

      // this.http.post(requestURL, payload, { headers }).subscribe({
      //   next: (response: any) => {
      //     if (response.success) {
      //       if (response.result.record.id) {
      //         this.toastr.success('LiveAccount saved successfully');
      //         this.router.navigate(['/liveaccount/lists']);
      //       }
      //     } else {
      //       this.toastr.error('Save Failed');
      //     }
      //   }, error: (errorRes) => {
      //     if (errorRes.status === 0) {
      //       const errorMessage = errorRes.message;
      //       this.toastr.error(errorMessage);
      //     } else {
      //       // Handle other HTTP errors
      //       const errorMessage = errorRes.error.message;
      //       this.toastr.error(errorMessage);
      //     }
      //   }
      // });

      this.http.post(requestURL, payload, { headers }).subscribe({
        next: (response: any) => {
          try {
            if (response.result.record.id) {
              this.toastr.success('LiveAccount saved successfully');
              this.router.navigate(['/liveaccount/lists']);
            }
          } catch (error) {
            this.handleErrorResponse(error);
          }
        },
        error: (errorRes: any) => {
          this.handleErrorResponse(errorRes);
        },
      });
    }
  }

  private handleErrorResponse(errorResponse: any): void {
    try {
      if (errorResponse.status === 0) {
        const errorMessage = errorResponse.message;
        this.toastr.error(errorMessage);
      } else {
        // Handle other HTTP errors
        const errorMessage = errorResponse.error.message;
        this.toastr.error(errorMessage);
      }
    } catch (error) {
      console.error('Error handling failed:', error);
      this.toastr.error('An unexpected error occurred.');
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
