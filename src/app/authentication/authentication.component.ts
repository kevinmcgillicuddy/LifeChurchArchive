import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {AuthProvider} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {


  authenticated:boolean;

  constructor(public auth: FirebaseService) { 
  
  }

  login(){
    this.auth.login()
  }
  logout(){
    this.auth.logout()
    this.authenticated = this.auth.isAuthenticated()
  }

  ngOnInit(): void {  
    this.authenticated = this.auth.isAuthenticated()
  }

}
