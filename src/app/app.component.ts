import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Direction } from './interfaces/HeroImage';
import {  NavigationEnd, NavigationStart, Router } from '@angular/router';
declare var gtag:Function
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Life Church Lancaster Archive';
  sub:any

  img:Direction;
  constructor(public firebaseService: FirebaseService, private route: Router ) {
    this.route.events.subscribe(e => {
      if(e instanceof NavigationStart){
        if (e.url === '/search'){ this.img=Direction.Search}
        else {this.img=Direction.Home}
      }
      if(e instanceof NavigationEnd ){
        gtag('config', 'G-7QNJ68FB9M', {'page_path':e.urlAfterRedirects});
      }
     
    })
   }

  
  ngOnInit() {    
    this.img = Direction.Home
  }
}
