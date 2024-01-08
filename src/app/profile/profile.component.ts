//C:\xampp8.2\htdocs\vt_portal_angular\src\app\profile\profile.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  user_id: string = '';
  userProfileData: any = {};
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
      this.fetchRecordData();
    }
  }

  fetchRecordData() {
    const userId = this.user_id;
    const requestURL = `http://localhost:3000/fetchUserProfile?contactid=${userId}`;

    this.http.get(requestURL).subscribe({
      next: (response: any) => {
        this.userProfileData = response.result;
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
  }
}


