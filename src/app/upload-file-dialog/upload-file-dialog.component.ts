import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  folders$:Observable<any>
  ngOnInit(): void {
    this.folders$ =  this.firebaseService.getFolders()
  }

    //upload a file
    submit(event, yearPicked) {
     if (!event.target.files[0].type.includes("audio")) {
        this.feedback = "Please select an audio file"
      }
      else {
        this.feedback = null
        const uploadResult = this.firebaseService.uploadFile(event,yearPicked);
          uploadResult.uploadPercent.pipe(
          finalize(() => {
            uploadResult.downloadURL.pipe(
              tap(downloadURL => this.firebaseService.createFirestoreRecord({
                downloadURL: downloadURL,
                fileName:uploadResult.fileName,
                metadata: uploadResult.metadata
              }))
            ).subscribe();
          })
        ).subscribe(percent => {
          this.uploadPercent = percent;
          if (percent === 100){
            this.feedback = "Complete"
          }
        }
          );
      }
    }


    ngOnDestroy(): void {
         }
}
