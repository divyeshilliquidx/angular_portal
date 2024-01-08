// //C:\xampp8.2\htdocs\vt_portal_angular\src\app\profile\changepassword.component.ts
// import { Component, ViewEncapsulation } from '@angular/core';

// @Component({
//   selector: 'app-changepassword',
//   templateUrl: './changepassword.component.html',
//   styleUrls: ['./changepassword.component.css'],
//   encapsulation: ViewEncapsulation.None
// })
// export class ChangepasswordComponent {

// }

// changepassword.component.ts
// import { Component, ViewEncapsulation } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// changepassword.component.ts
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
// "src/styles.css",
//    "node_modules/ngx-toastr/toastr.css"

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['../../../node_modules/ngx-toastr/toastr.css', './changepassword.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangepasswordComponent {
  //changePasswordForm: FormGroup;
  user_id: string = '';
  new_password: string = '';
  conform_new_password: string = '';
  new_passwordValid: boolean = true;
  conform_new_passwordValid: boolean = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private location: Location
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-top-right'; // Adjust position as needed
  }

  onSubmit() {

    if (!this.new_password) {
      this.new_passwordValid = false;
    } else {
      this.new_passwordValid = true;
    }

    if (!this.conform_new_password) {
      this.conform_new_passwordValid = false;
    } else {
      this.conform_new_passwordValid = true;
    }

    // Compare new password and confirm new password
    if (this.new_password !== this.conform_new_password) {
      this.new_passwordValid = false;
      this.conform_new_passwordValid = false;
      // Display an error message or handle it as needed
      this.toastr.error("New password and confirm password do not match.");
    } else {
      // Passwords match, you can proceed with your API call or other logic here
      // Reset the error flags
      this.new_passwordValid = true;
      this.conform_new_passwordValid = true;
      // Call your API here
      this.changePassword(this.new_password);
    }

  }

  changePassword(new_password: String) {
    this.user_id = localStorage.getItem('user_id') ?? '';

    const requestURL = 'http://localhost:3000/changePassword';

    const payload = {
      "new_password": new_password,
      "contactid": this.user_id
    };

    this.http.post(requestURL, payload).subscribe({
      next: (response: any) => {
        this.toastr.success("Password changed successfully");
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

  onCancel(): void {
    this.location.back();
  }
}

