import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import firebase from 'firebase/app';
import { Direction } from './interfaces/HeroImage';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

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
      if(e instanceof NavigationStart)
        console.log(e.url);
    })
   }

  
  ngOnInit() {    
    this.img = Direction.Home
  }
}
