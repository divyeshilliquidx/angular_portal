// C:\xampp8.2\htdocs\vt_portal_angular\src\app\login\login.component.ts
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css'],
  styleUrls: ['../../../node_modules/ngx-toastr/toastr.css', './login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  emailValid: boolean = true;
  passwordValid: boolean = true;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private toastr: ToastrService
  ) { }

  login(): void {
    if (!this.email) {
      this.emailValid = false;
    } else {
      this.emailValid = true;
    }

    if (!this.password) {
      this.passwordValid = false;
    } else {
      this.passwordValid = true;
    }

    if (this.emailValid && this.passwordValid) {
      const requestURL = 'http://localhost:3000/login';
      const payload = {
        username: this.email,
        userpassword: this.password,
      };

      this.httpService.post(requestURL, payload).subscribe({
        next: (response: any) => {
          const user_password = 'Admin@123';
          localStorage.setItem('user_name', response.result.user_name);
          localStorage.setItem('user_password', user_password);
          localStorage.setItem('user_id', response.result.id);
          this.router.navigate(['/']);
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

      // this.httpService.post(requestURL, payload).subscribe(
      //   (response) => {
      //     const user_password = 'Admin@123';
      //     localStorage.setItem('user_name', response.result.user_name);
      //     localStorage.setItem('user_password', user_password);
      //     localStorage.setItem('user_id', response.result.id);
      //     this.router.navigate(['/']);
      //   }, (errorData) => {
      //     const errorMessage = errorData.error.message;
      //     this.toastr.error(errorMessage);
      //   }
      // );
    }
  }
}
