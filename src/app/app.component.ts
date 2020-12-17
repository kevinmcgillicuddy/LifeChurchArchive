
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Life Church Lancaster Archive';
  folders$: Observable<any>;

  constructor(public firebaseService: FirebaseService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(UploadFileDialogComponent);
  }

  ngOnInit() {
      this.folders$ = this.firebaseService.getFolders()
    
  }
  sendFile(data) {
    this.firebaseService.sendFileForTranscription(data)
  }

}



