import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class TicketEditComponent implements OnInit {
  user_id: string = '';
  user_name: string = '';
  user_password: string = '';

  ticket_title: string = '';
  ticketstatus: string = '';
  ticketpriorities: string = '';
  ticketseverities: string = '';
  recordId: number = 0;
  recordData: any = null;

  ticket_titleValid: boolean = true;
  ticketstatusValid: boolean = true;
  ticketprioritiesValid: boolean = true;
  ticketseveritiesValid: boolean = true;

  // searchSubject = new Subject<string>();
  // products: any[] = [];
  // filteredProducts$: Observable<any[]> | undefined;

  searchSubject = new Subject<string>();  // Use Subject<string>
  products: any[] = [];
  filteredProducts$: Observable<any[]> | undefined;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private toastr: ToastrService,
    private http: HttpClient,
    private route: ActivatedRoute  // Inject ActivatedRoute

  ) { }

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


    const requestURL = 'http://localhost:3000/fetchCRMRecordByQuery';
    const payload = {
      "module": "Reports",
      "query": ["SELECT vtiger_products.* FROM vtiger_products  INNER JOIN vtiger_crmentity ON vtiger_products.productid = vtiger_crmentity.crmid  WHERE vtiger_crmentity.deleted=0 AND vtiger_products.productid > 0 ORDER BY vtiger_crmentity.modifiedtime DESC"]
    };

    this.httpService.post(requestURL, payload).subscribe({
      next: (response: any) => {
        this.products = response.data;

        // this.filteredProducts$ = this.searchSubject.pipe(
        //   startWith(''),
        //   map(value => this._filter(value))
        // );

        this.filteredProducts$ = this.searchSubject.pipe(
          startWith(''),
          map((value: string) => this._filter(value))
        );
      },
      error: (errorRes: any) => {
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
      module: 'HelpDesk',
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
          this.ticket_title = response.result[0].title;
          this.ticketstatus = response.result[0].status;
          this.ticketpriorities = response.result[0].priority;
          this.ticketseverities = response.result[0].severity;
        }
      },
      error: (data: any) => { }
    });
  }



  saveRecordData(): void {
    if (!this.ticket_title) {
      this.ticket_titleValid = false;
    } else {
      this.ticket_titleValid = true;
    }

    if (!this.ticketstatus) {
      this.ticketstatusValid = false;
    } else {
      this.ticketstatusValid = true;
    }

    if (!this.ticketpriorities) {
      this.ticketprioritiesValid = false;
    } else {
      this.ticketprioritiesValid = true;
    }


    if (this.ticket_titleValid && this.ticketstatusValid && this.ticketprioritiesValid) {
      this.user_id = localStorage.getItem('user_id') ?? '';
      this.user_name = localStorage.getItem('user_name') ?? '';
      this.user_password = localStorage.getItem('user_password') ?? '';

      const requestURL = 'http://localhost:3000/saveRecord';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json', // Set the content type to JSON
      });

      const payload: { [key: string]: string | number } = {
        module: 'HelpDesk',
        values: `{"ticket_title": "${this.ticket_title}", "ticketstatus": "${this.ticketstatus}", "ticketpriorities": "${this.ticketpriorities}","ticketseverities": "${this.ticketseverities}"}`,
        username: this.user_name,
        password: this.user_password
      };

      // Retrieve recordId from route parameters
      const recordId = this.route.snapshot.params['id'];

      // Check if recordId exists before adding it to the payload
      if (recordId) {
        payload['recordId'] = '17x' + recordId;  // Convert to number if needed
      }

      this.http.post(requestURL, payload, { headers }).subscribe({
        next: (response: any) => {
          if (response.result.record.id) {
            this.toastr.success('Ticket saved successfully');
            this.router.navigate(['/ticket/lists']);
          }
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
    }
  }

  onCancel(): void {
    this.router.navigate(['/ticket/lists']);
  }
}
