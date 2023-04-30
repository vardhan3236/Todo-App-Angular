import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  myForm: FormGroup;
  loggedIn: boolean = false;
  loggingIn: boolean = false;
  errorMessage: String = "";
  constructor( private formBuilder: FormBuilder, private api: ApiService, private router: Router) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  login() {
  this.loggingIn = true;
 
      if(this.myForm.valid) 
        this.api.login(this.myForm).subscribe((value) => {
          this.loggedIn = value.success;
        },
        (error) => {
          this.loggingIn = false;
          this.errorMessage = error.error.message;
        });
}
}
