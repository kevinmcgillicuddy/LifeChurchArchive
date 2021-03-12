import { Component, Input} from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { MatDialog} from '@angular/material/dialog';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AngularFireAuth } from '@angular/fire/auth';
import {Direction} from '../interfaces/HeroImage'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() heroImg: Direction;

  constructor(public firebaseService: FirebaseService,public dialog: MatDialog,public auth: AngularFireAuth) {   }

 openUploadDialog() {
  this.dialog.open(UploadFileDialogComponent);
}

openAuthDialog() {
  this.dialog.open(AuthenticationComponent);
}

logout(){
   this.firebaseService.logout()
}

}
