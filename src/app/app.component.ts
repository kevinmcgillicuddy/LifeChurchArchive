
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component'
import { TextDiplayDialogComponent } from './text-diplay-dialog/text-diplay-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Life Church Lancaster Archive';
  folders$: Observable<number[]>;

  constructor(public firebaseService: FirebaseService, public dialog: MatDialog) { }

  onTextClick(text:string):void{
    // console.log("cliked"+text)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = text
    // const textRef = this.dialog.open(TextDiplayDialogComponent,dialogConfig);
  }
  openDialog() {
    const dialogRef = this.dialog.open(UploadFileDialogComponent);
  }

  ngOnInit() {
      this.folders$ = this.firebaseService.getFolders();
   
  }
  sendFile(data) {
    this.firebaseService.sendFileForTranscription(data)
  }

}




