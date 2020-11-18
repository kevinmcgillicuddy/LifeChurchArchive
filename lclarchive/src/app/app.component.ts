  
import { Component } from '@angular/core';
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
  downloadURL= this.firebaseService.downloadURL;
  async=this.firebaseService.test;
  uploadPercent = this.firebaseService.uploadPercent;

  constructor(
    public firebaseService: FirebaseService  ) { }


 ngOnInit() {
   this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
    })
  }



  previewFile(event) {
    this.uploadValue = 0;
    let type = "audio";
    if (!event.target.files[0].type.includes(type)) {
      this.feedback = "Please upload an audio file and try again";
    } else {
      this.mp3Data = event.target.files[0];
    }
  }

  submit(event){
    this.firebaseService.uploadFile(event);
  }
 

}
