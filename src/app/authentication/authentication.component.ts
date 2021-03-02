import { Component } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import { MatIconRegistry} from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  constructor(public auth: FirebaseService, private matIconRegistry: MatIconRegistry,  private domSanitizer: DomSanitizer,) { 
    this.matIconRegistry
    .addSvgIcon('google',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/google.svg'))
    .addSvgIcon('microsoft',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/microsoft.svg'))
  }

  authState:boolean;
  name:string;

  login(providerInput:string){
     this.auth.login(providerInput).then(result=>{
       this.name = result.user.displayName
        this.authState = true;
     })
  }


}
