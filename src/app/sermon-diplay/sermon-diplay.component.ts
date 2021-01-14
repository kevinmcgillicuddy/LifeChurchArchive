import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from '../../services/firebase.service';
import { TextDiplayDialogComponent } from '../text-diplay-dialog/text-diplay-dialog.component';

@Component({
  selector: 'app-sermon-diplay',
  templateUrl: './sermon-diplay.component.html',
  styleUrls: ['./sermon-diplay.component.css']
})
export class SermonDiplayComponent implements OnInit {
  @Input() year: number;
  constructor(public firebaseService: FirebaseService, public dialog: MatDialog) { }
  sermons: object;
  text: any;
  blah: any;
  blahy:any;

  goToDownloadPage(href:string) { window.open(`${href}`, '_blank') };

  getTranslatedText(uuid: string): void {
    this.firebaseService.getText(uuid).then(docs => {
      this.text = docs.docs.map(e => e.data())
      this.openDialog();
    })
  }

  sendFileForTranscription(data:object):void {
     this.firebaseService.sendFileForTranscription(data)
  }

  openDialog() {
    const dialogRef = this.dialog.open(TextDiplayDialogComponent, {
      data: {
        text: this.text[0].text
      },
      autoFocus: false,
      maxHeight: '90vh'
    });
  }

  ngOnInit(): void {
    this.firebaseService.getSermonFilesRecords(this.year).then(docs => {
          this.sermons = docs.docs.map(e => e.data())
        })  
        
        // function mappy(input){
        //   this.blahy = this.blahy.push(input)
        // }

        // this.blah = this.firebaseService.getSermonFilesRecordsSnapshot(this.year)
        // this.blah.onSnapshot(querySnapshot=> {
        //     querySnapshot.forEach(function(doc) {
        //       mappy(doc)
        //     });      
        // });
    
  }
          
}

