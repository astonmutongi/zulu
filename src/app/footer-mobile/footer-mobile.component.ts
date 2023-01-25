import { Component, OnInit } from '@angular/core';
import {  AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer-mobile',
  templateUrl: './footer-mobile.component.html',
  styleUrls: ['./footer-mobile.component.css']
})
export class FooterMobileComponent implements OnInit {
  isLoggedIn: boolean = false; 
  private loginChangeSub!: Subscription | null;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {

    this.loginChangeSub = this.authenticationService.loginChange.subscribe(entry => this.isLoggedIn = entry);
     
    if (this.authenticationService.currentUserValue) {
      this.isLoggedIn = true;
    }    
  }

  ngOnDestroy() {
    if (this.loginChangeSub) {
      this.loginChangeSub.unsubscribe();
      this.loginChangeSub = null;
    }
  }
  onLogout(){
    this.authenticationService.logout(); 
    this.isLoggedIn = false;        
    this.router.navigate(['./home']);          
  }

}
