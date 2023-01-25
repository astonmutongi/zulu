import { Component, OnInit } from '@angular/core';
import { ListingService, ListingView } from '../services/listing.service';
import { BaseService,  } from '../services/baseService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Data: ListingView[] = [];  
  DataResponse: ListingView[] = [];
  loading = false;
  constructor(private listingService: ListingService,  private baseService: BaseService) { }
  ngOnInit() {
    this.loading = true;
    this.listingService.getDashboard().subscribe((res) => {
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

  getfile(listingId)
  {

    this.loading = true;
   // window.location.href = this.listingService.listingFilesApi + "?listingId=" + listingId;
   this.listingService.getlistingFiles(listingId).subscribe((res) => {

    const downloadedFile = res;
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    a.download = 'video.mp4';
    a.href = URL.createObjectURL(downloadedFile);
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
    this.loading = false;
  }, error => {
    this.loading = false;
    console.log(error);
  })

  }
}
