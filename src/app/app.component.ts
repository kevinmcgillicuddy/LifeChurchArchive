
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component'
import {MetadataPipe} from './pipes/metadata.pipe'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'lclarchive';
  sermons: any[];
  folders$: Observable<any>;
  folderResponse: any
  text:Observable<any>;
  sermons$:Observable<any>

  constructor(public firebaseService: FirebaseService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(UploadFileDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    // this.firebaseService.getSermonsfromFireBase().then(response => {
    //   this.sermons = response
    // })

    this.sermons$ = this.firebaseService.getSermonFilesObv().pipe(
      mergeMap(sermons => {
        return Promise.all(sermons.items.map( async sermon => ({
          name: sermon.name,
          metadata: await sermon.getMetadata()
        })))
      }))
      
    
    
    // this.text = this.firebaseService.getText('1wsvh390y4g')
    this.folders$ = this.firebaseService.getFolders()
    this.folders$.subscribe({ next: folder => { this.folderResponse = folder.prefixes } })
  }

  sendFile(data) {
    this.firebaseService.sendFileForTranscription(data)
  }


}




