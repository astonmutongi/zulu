import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService,  } from '../services/baseService';
import { SAVER, Saver } from '../saver.provider';
import { download, Download } from '../download'; 

export interface Video {
    title: string;
    embed: string;
}
export interface Competetion {
    name: string;
    id: string;
    medurlia: string;
}

export interface ListingView {
  listingId: string;
  title: string;
  description:string;
  createdate: string;
  coverImage:string;
  price:string;  
}

export interface ListingFile {
  thumbnail: string;
  video: string;  
}

@Injectable({
  providedIn: 'root'
})
export class ListingService {
 
  api: string ;
  vipApi: string ;
  dash: string ;
  listingFilesApi: string;

  constructor(private http: HttpClient,  private baseService: BaseService, @Inject(SAVER) private save: Saver) { 
    this.api =  this.baseService.apiBaseURL + "Listing/listings";
    this.vipApi = this.baseService.apiBaseURL + "Listing/vip";
    this.dash = this.baseService.apiBaseURL + "Listing/dashboard";
    this.listingFilesApi = this.baseService.apiBaseURL + "Listing/Getfile";  
  }

  getPreviews(): Observable<ListingView[]> {    
    return this.http.get<ListingView[]>(this.api)
  }

  getVip(): Observable<ListingView[]> {   
    return this.http.get<ListingView[]>(this.vipApi)
  }


  getDashboard(): Observable<ListingView[]> {    
    return this.http.get<ListingView[]>(this.dash)
  }

  getlistingFiles(listId: string) {   
    var formData = new FormData();
    formData.append("listingId", listId);
    return this.http.post(this.listingFilesApi, formData, {reportProgress: true, observe: 'events', responseType: 'blob'} )
  }

  getlistingFile(listId: string) : Observable<Download>  {   
    var formData = new FormData();
    formData.append("listingId", listId);
    return this.http.post(this.listingFilesApi, formData, {reportProgress: true, observe: 'events', responseType: 'blob'} ).pipe(download(blob => this.save(blob, "file.mp4")))
  }  

  

  downloadlistingFiles(listId: string): void {   
    var formData = new FormData();
    window.location.href = this.listingFilesApi + "?listingId=" + listId; //  formData.append(, );
    //return this.http.post<ListingFile[]>(this.listingFilesApi, formData)
  }
}
