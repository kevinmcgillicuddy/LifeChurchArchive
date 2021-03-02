import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import firebase from 'firebase/app';
import { Direction } from './interfaces/HeroImage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Life Church Lancaster Archive';
  tabs$: firebase.firestore.QueryDocumentSnapshot<any>[]
  img:Direction;
  constructor(public firebaseService: FirebaseService, ) { }
  
  ngOnInit() {
      this.img = Direction.Home
      this.firebaseService.getYears().subscribe(e=>{
        this.tabs$ = e.docs;
      })
    }
}




