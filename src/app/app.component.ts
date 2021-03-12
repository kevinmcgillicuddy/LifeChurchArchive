import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Direction } from './interfaces/HeroImage';
import {  NavigationStart, Router } from '@angular/router';

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
        console.log(e.url)
        if (e.url === '/search'){ this.img=Direction.Search}
        else {this.img=Direction.Home}
      }
     
    })
   }

  
  ngOnInit() {    
    this.img = Direction.Home
  }
}
