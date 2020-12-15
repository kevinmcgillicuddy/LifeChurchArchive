import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {
  uploadValue: any;
  feedback: string;
  downloadURL: string;
  uploadPercent: number;
  
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

    //upload a file
    submit(event) {
      if (!event.target.files[0].type.includes("audio")) {
        this.feedback = "Please select an audio file"
      }
      else {
        this.feedback = null
        const uploadResult = this.firebaseService.uploadFile(event);
          uploadResult.uploadPercent.pipe(
          finalize(() => {
            uploadResult.downloadURL.subscribe(url => this.downloadURL = url);
            //create firestore record
            console.log('finished')
            this.firebaseService.createFirestoreRecord({
              downloadURL: this.downloadURL,
              fileName:uploadResult.fileName,
              metadata: uploadResult.metadata
              })
                 
                
          })
        ).subscribe(percent => this.uploadPercent = percent);
        
      }
    }


    ngOnDestroy(): void {
         }
}
