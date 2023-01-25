import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {  AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './base.css','./layout.css','./shortcodes.css','./responsive.css','./css.css',  './media.css','./menu.css','./style_002.css']
})
export class AppComponent {
  isLoggedIn$: Observable<boolean> = new Observable<boolean>(); 
  isLoggedIn: boolean = false; 
  isMobile: boolean = true; 
  title = 'Zulu-Barb-ui';
  private loginChangeSub!: Subscription | null;
  constructor( private authenticationService: AuthenticationService, private router: Router){}

  ngOnInit() {

    this.loginChangeSub = this.authenticationService.loginChange.subscribe(entry => this.isLoggedIn = entry);
    window.onresize = () => this.isMobile = window.innerWidth <= 991;

    if (window.screen.width === 991) { // 768px portrait
      this.isMobile = true;
    } else  this.isMobile = false;
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
