import { Component, OnInit } from '@angular/core';
import {  AuthenticationService } from '../services/authentication.service';
import {  UserService } from '../services/user.service';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  loading = false;
  submitted = false;
  registerForm: FormGroup;
  listingId:string = '';    
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService
        
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['./dashboard']);
      }
      this.registerForm = this.formBuilder.group ({
          listingId: ['00000000-0000-0000-0000-000000000000'],
          title: [''],
          description: [''],
          price: [0],
          points:[0],
          ownerId:['00000000-0000-0000-0000-000000000000'],
          recordStatus: [1]     
        });
  }

  ngOnInit() {
      var state = history.state;
      if(state.listingId && state.listingId.length > 0)
          this.listingId = state.listingId;

      this.registerForm = this.formBuilder.group({                
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      var that = this;
      // reset alerts on submit
    //  this.alertService.clear();

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.reset(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
              },
              error => {
                 // this.alertService.error(error);
                  this.loading = false;
              });
  }

}
