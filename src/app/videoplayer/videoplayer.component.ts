import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ListingService, ListingFile } from '../services/listing.service';
import { ActivatedRoute } from '@angular/router';
import { BaseService,  } from '../services/baseService';
@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {
 // @ViewChild('videoPlayer') videoplayer?: ElementRef;
  DataResponse: ListingFile[] = [];
  videoSource: string = '';
  constructor(private listingService: ListingService,  private baseService: BaseService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    var that = this;
    var id=history.state; 
     
    this.listingService.getlistingFiles(id.id).subscribe((res) => {

      const downloadedFile = res;
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      a.download = 'video.mp4';
      a.href = URL.createObjectURL(downloadedFile);
      a.target = '_blank';
      a.click();
      document.body.removeChild(a);

    }, error => {
     
      console.log(error);
    })
  }
 

  video() {
    console.log('im Play!');
    //this.videoplayer?.nativeElement.play();
  }
}
