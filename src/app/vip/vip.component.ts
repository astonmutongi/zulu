import { Component, OnInit } from '@angular/core';
import { ListingService, ListingView } from '../services/listing.service';
import { BaseService,  } from '../services/baseService';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-vip',
  templateUrl: './vip.component.html',
  styleUrls: ['./vip.component.css']
})
export class VipComponent implements OnInit {
  Data: ListingView[] = [];  
  DataResponse: ListingView[] = [];
  IsLoggedIn: boolean;
  loading = false;
  constructor(private listingService: ListingService,  private baseService: BaseService, private authenticationService: AuthenticationService) {
    this.IsLoggedIn = this.authenticationService.currentUserValue != null && this.authenticationService.currentUserValue.token != null && this.authenticationService.currentUserValue.token.length > 0;

   }
  ngOnInit() {
    this.loading = true;
    this.listingService.getVip().subscribe((res) => {
          this.DataResponse = res;
          this.loading = false;
        }, error => {
          console.log(error);
          this.loading = false;
        })
  }
  createImgPath = (serverPath: string) => {
    return `${this.baseService.apiBaseURL}${serverPath}`;
  }
}
