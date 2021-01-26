import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {
  
  feedback: string;
  yearPicked: number;
  years: Array<any>;
  files: File[] = [];

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getYears().subscribe(e=>{
      this.years = e.docs
    })
  }

  onSelectFiles(event: Event) {
    const targetFiles = (event.target as HTMLInputElement).files
    for (let i = 0; i < targetFiles.length; i++) {
      if (targetFiles.item(i).type === 'audio/mpeg') {
        this.files.push(targetFiles.item(i));
        this.feedback = null
      }
      else {
        this.feedback = "One of your files was not an mp3 audio file and will excluded from upload "
      }
    }
  }
}