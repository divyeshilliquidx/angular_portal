import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TicketDetailComponent implements OnInit {
  user_id: string = '';
  user_name: string = '';
  user_password: string = '';

  ticket_title: string = '';
  ticketstatus: string = '';
  ticketpriorities: string = '';
  ticketseverities: string = '';
  recordId: number = 0;
  recordData: any = null;
  ticketid: number = 0;

  ticket_titleValid: boolean = true;
  ticketstatusValid: boolean = true;
  ticketprioritiesValid: boolean = true;
  ticketseveritiesValid: boolean = true;

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
      this.fetchDataByRecordId(recordId);
    }
  }

  fetchDataByRecordId(recordId: number) {

    const requestURL = 'http://localhost:3000/fetchReferenceRecords';

    const loginPayload = {
      module: 'HelpDesk',
      page: 1,
      search_params: [[]],
      crmid: recordId,
      per_page: 1,
      contactid: this.user_id,
    };

    this.httpService.post(requestURL, loginPayload).subscribe({
      next: (response: any) => {
        this.recordData = response;
        this.ticket_title = response.result[0].title;
        this.ticketstatus = response.result[0].status;
        this.ticketpriorities = response.result[0].priority;
        this.ticketseverities = response.result[0].severity;
        this.ticketid = response.result[0].ticketid
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
