import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog} from '@angular/material/dialog';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component'
import {AuthenticationComponent} from './authentication/authentication.component';
import firebase from 'firebase/app';
import { StringDecoder } from 'string_decoder';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Life Church Lancaster Archive';
  tabs$: firebase.firestore.QueryDocumentSnapshot<any>[]
  loggedIn: boolean;
  name:string;
  constructor(public auth: FirebaseService,public firebaseService: FirebaseService, public dialog: MatDialog) { }

  openUploadDialog() {
    this.dialog.open(UploadFileDialogComponent);
  }
  openAuthDialog() {
    this.dialog.open(AuthenticationComponent);
  }
  setName(message:string){
    this.name = message;
    this.loggedIn=true;
  }
  logout(){
    this.auth.logout()
    this.loggedIn = this.auth.isAuthenticated();
  }
  ngOnInit() {
      this.firebaseService.getYears().subscribe(e=>{
        this.tabs$ = e.docs;
      })
      this.loggedIn = this.firebaseService.isAuthenticated();
  }
}




