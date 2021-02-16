import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { DialogData } from '../interfaces/DialogData';
import { FirestoreRecord } from '../interfaces/FirestoreRecord';
import { TextDiplayDialogComponent } from '../text-diplay-dialog/text-diplay-dialog.component';



@Component({
  selector: 'app-sermon-diplay',
  templateUrl: './sermon-diplay.component.html',
  styleUrls: ['./sermon-diplay.component.css']
})
export class SermonDiplayComponent implements OnInit {
  @Input() year: string;
  
  constructor(public firebaseService: FirebaseService, public dialog: MatDialog) {  }

  sermons$: Observable<FirestoreRecord[]> ;
  text: object;
  feedback:string;

  goToDownloadPage(href:string) { window.open(`${href}`, '_blank') };

  getTranslatedText(uuid: string, year:string): void {
    this.firebaseService.getText(uuid, year).then(docs => {
      this.text = docs.docs.map(e => e.data())
      this.openDialog({title:`Transcription of: ${this.text[0].filename}`,text:this.text[0].text});
    })
  }   
  
  sendFileForTranscription(data:FirestoreRecord):void {
    this.firebaseService.sendFileForTranscription(data).catch(err=>this.openDialog(err))
  }

  openDialog(data:DialogData) {
    this.dialog.open(TextDiplayDialogComponent, {
      data: {
        title:data.title,
        text:data.text
      },
      autoFocus: false,
      maxHeight: '90vh'
    });
  }

  ngOnInit(): void {
     this.sermons$ = this.firebaseService.getSermonFilesRecordsObv(this.year)
    }
          
}

