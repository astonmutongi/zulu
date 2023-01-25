import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService,  } from '../services/baseService';


export class PreSubscription
 {
  listingId: string = '';
  userId: string = '';
  id:string = '';
  createdate: string = '';  
  price:string = '';  
}



@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
 
  api: string ;
  vipApi: string ;
  preSubscriptionApi: string;

  constructor(private http: HttpClient,  private baseService: BaseService) { 
    this.api =  this.baseService.apiBaseURL + "Listing/listings";
    this.vipApi = this.baseService.apiBaseURL + "Listing/vip";
    this.preSubscriptionApi = this.baseService.apiBaseURL + "Subscription/presubscribe";  
  }

 
  preSubcribe(preSubscription: PreSubscription): Observable<PreSubscription> {   
    var formData = new FormData();
    formData.append("listingId", preSubscription.listingId);
    return this.http.post<PreSubscription>(this.preSubscriptionApi, formData)
  }
}
