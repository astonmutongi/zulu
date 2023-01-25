import { Component, OnInit } from '@angular/core';
import { ListingService, ListingView } from '../services/listing.service';
import { BaseService,  } from '../services/baseService';
import { Download } from '../download'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-previews',
  templateUrl: './previews.component.html',
  styleUrls: ['./previews.component.css']
})
export class PreviewsComponent implements OnInit {
  Data: ListingView[] = [];  
  DataResponse: ListingView[] = [];
  loading = false;
  download$: Observable<Download>
  constructor(private listingService: ListingService,  private baseService: BaseService) { }
  ngOnInit() {
    this.loading = true;
    this.listingService.getPreviews().subscribe((res) => {
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
   
    this.download$ = this.listingService.getlistingFile(listingId);
   
  }
}
