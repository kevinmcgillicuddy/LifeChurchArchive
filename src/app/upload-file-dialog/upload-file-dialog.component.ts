import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FirebaseService } from 'src/services/firebase.service';
import { FirestoreRecord } from '../interfaces/FirestoreRecord';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {

  feedback: string;
  downloadURL: string;
  uploadPercent: number;
  yearPicked: number;
  years$: Observable<number[]>

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.years$ = this.firebaseService.getFolders()
  }

  UploadFileToStorage(event: Event, yearPicked: number): void {
    const files = (event.target as HTMLInputElement).files

    if (!files[0].type.includes("audio/mp3")) {
      this.feedback = "Please select an mp3 audio file"
    }
    else if (!this.yearPicked) {
      this.feedback = "Please select a year for this archive file"
    }
    else {
      this.feedback = null
      const uploadResult = this.firebaseService.uploadFile(event, yearPicked);
      uploadResult.uploadPercent.pipe(
        finalize(() => {
          uploadResult.downloadURL.pipe(
            tap(downloadURL => this.firebaseService.createFirestoreRecord({
              downloadURL: downloadURL,
              year: this.yearPicked,
              fileName: uploadResult.fileName,
              metadata: uploadResult.metadata
            } as FirestoreRecord))
          ).subscribe();
        })
      ).subscribe(percent => {
        this.uploadPercent = percent;
        if (percent === 100) {
          this.feedback = "Complete"
        }
      }
      );
    }
  }
}
