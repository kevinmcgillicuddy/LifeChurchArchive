
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'lclarchive';
  items: Array<any>;

  mp3Data: any;


  sermons: any;
  folders$: Observable<any>;
  folderResponse: any

  constructor(public firebaseService: FirebaseService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(UploadFileDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.firebaseService.getSermonsfromFireBase().then(response => {
      this.sermons = response
    })

    this.folders$ = this.firebaseService.getFolders()
    this.folders$.subscribe({ next: folder => { this.folderResponse = folder.prefixes } })
  }



  sendFile(data) {
    this.firebaseService.sendFileForTranscription(data)
  }


}




