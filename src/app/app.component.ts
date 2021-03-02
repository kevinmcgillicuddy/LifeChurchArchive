import { Component, Input } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog} from '@angular/material/dialog';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component'
import {AuthenticationComponent} from './authentication/authentication.component';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Life Church Lancaster Archive';
  tabs$: firebase.firestore.QueryDocumentSnapshot<any>[]
  authState:any;

  constructor(public auth: FirebaseService,public firebaseService: FirebaseService, public dialog: MatDialog) { }
  
  isLoggedIn(){
     this.firebaseService.isAuthenticated().subscribe(user=>{
       this.authState=user
    })
  }
  openUploadDialog() {
    this.dialog.open(UploadFileDialogComponent);
  }

  openAuthDialog() {
    this.dialog.open(AuthenticationComponent);
  }

  logout(){
    console.log('this is freaking working')
     this.firebaseService.logout()
  }

  ngOnInit() {
    this.isLoggedIn()
    // this.auth.auth.user.subscribe()
      this.firebaseService.getYears().subscribe(e=>{
        this.tabs$ = e.docs;
      })
    }
}




