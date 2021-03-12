import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';
import firebase from 'firebase/app';
import { Direction } from '../interfaces/HeroImage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tabs$: firebase.firestore.QueryDocumentSnapshot<any>[]
  img:Direction;
  constructor(public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.img = Direction.Home
    this.firebaseService.getYears().subscribe(e=>{
      this.tabs$ = e.docs;
    })  
  }

}
