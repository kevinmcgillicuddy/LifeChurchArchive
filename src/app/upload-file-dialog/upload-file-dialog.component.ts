import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
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
  yearPicked: string;

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

    //upload a file
    submit(event, yearPicked) {
      console.log(yearPicked)
      if (!event.target.files[0].type.includes("audio")) {
        this.feedback = "Please select an audio file"
      }
      else {
        this.feedback = null
        const uploadResult = this.firebaseService.uploadFile(event);
          uploadResult.uploadPercent.pipe(
          finalize(() => {
            //may have to  get download URL later this has an access token
            uploadResult.downloadURL.pipe(
              tap(downloadURL => this.firebaseService.createFirestoreRecord({
                downloadURL: downloadURL,
                fileName:uploadResult.fileName,
                metadata: uploadResult.metadata
              }))
            ).subscribe(url => this.downloadURL = url);
          })
        ).subscribe(percent => this.uploadPercent = percent);
        
      }
    }


    ngOnDestroy(): void {
         }
}
