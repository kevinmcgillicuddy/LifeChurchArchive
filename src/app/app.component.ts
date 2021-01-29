import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog} from '@angular/material/dialog';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component'
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Life Church Lancaster Archive';
  tabs$: firebase.firestore.QueryDocumentSnapshot<any>[]
  loggedIn: boolean;

  constructor(public firebaseService: FirebaseService, public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(UploadFileDialogComponent);
  }

  ngOnInit() {
      this.firebaseService.getYears().subscribe(e=>{
        this.tabs$ = e.docs
      })
      this.loggedIn = this.firebaseService.isAuthenticated()
  }
}




