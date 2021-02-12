import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { MatIconRegistry} from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {


  authenticated:boolean;
  provider:string

  constructor(public auth: FirebaseService, private matIconRegistry: MatIconRegistry,  private domSanitizer: DomSanitizer,) { 
    this.matIconRegistry
    .addSvgIcon('google',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/google.svg'))
    .addSvgIcon('microsoft',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/microsoft.svg'))
  }

  login(){
    this.auth.login(provider)
  }
  logout(){
    this.auth.logout()
    this.authenticated = this.auth.isAuthenticated()
  }

  ngOnInit(): void {  
    this.authenticated = this.auth.isAuthenticated()
  }

}
