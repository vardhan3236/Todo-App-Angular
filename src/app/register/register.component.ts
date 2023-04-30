import { Component } from '@angular/core';
import {HttpClientModule, HttpHeaders, HttpClient} from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from "../api.service";
import { Router } from '@angular/router'; 


function passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmpassword')?.value;
  return password == confirmPassword? null: {'passwordMismatch': true};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
myForm: FormGroup;
switchToLogin: boolean = false;
registered: boolean = false;
registering: boolean = false;
errorMessage: String = "";
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private api: ApiService, private router: Router) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmpassword: ['', [Validators.required]],
      password: ['', [Validators.required]]
    },
    {
      validator: passwordMatchValidator
    });
  }

  register(){
  this.registering = true;
     if(this.myForm.valid) 
        this.api.register(this.myForm).subscribe((value: { success: boolean; }) => {
          if(value.success == true)
              this.registered = true;
        },
        (error) => {
          this.registering = false;
          this.errorMessage = error.error.message;
        });
  }

  goToLoginComponent() {
    this.switchToLogin = true;
  }
}
