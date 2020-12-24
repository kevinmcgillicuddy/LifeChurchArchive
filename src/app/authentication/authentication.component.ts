import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(public firebaseService: FirebaseService) { }

  login;
  logout;
  ngOnInit(): void {
    this.login = this.firebaseService.login;
    this.logout = this.firebaseService.logout
  }

}
