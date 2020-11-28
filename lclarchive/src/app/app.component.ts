  
import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lclarchive';
  items: Array<any>;
  uploadValue: any;
  feedback:string;
  mp3Data:any;
  

  downloadURL:string;
  uploadPercent:number;
  sermons:any;

  constructor(
    public firebaseService: FirebaseService  ) { }


 ngOnInit() {
    this.firebaseService.getSermonsfromFireBase().then(res=>{
      this.sermons=res})
  }

  //upload a file
  submit(event){
    if (!event.target.files[0].type.includes("audio")) {
      this.feedback = "please enter an audio file"
    }
    else{
      this.feedback=null
      const uploadResult = this.firebaseService.uploadFile(event);
      uploadResult.uploadPercent.pipe(
        finalize(() => {
          uploadResult.downloadURL.subscribe(url => this.downloadURL = url);
        })
      ).subscribe(percent => this.uploadPercent = percent);
    }
  }

  sendFile(url,uuid,event){
    this.firebaseService.sendFileForTranscription(url,uuid,event)
  }
 

}
