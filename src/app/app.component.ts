import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import firebase from 'firebase/app';
import { Direction } from './interfaces/HeroImage';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Life Church Lancaster Archive';
  tabs$: firebase.firestore.QueryDocumentSnapshot<any>[]
  img:Direction;
  constructor(public firebaseService: FirebaseService, public db: AngularFirestore ) { }
  searchArray=[];
  
  ngOnInit() {
      
    this.img = Direction.Home
      this.firebaseService.getYears().subscribe(e=>{
        this.tabs$ = e.docs;
      })
      
    
    
      var sermonsThatHaveText = this.db.collectionGroup('items', ref=> ref.where('text', '!=', null))

      sermonsThatHaveText.get().subscribe(docs=>{
        docs.forEach(doc=>{
          console.log(doc)
          this.searchArray.push(doc.data())
          console.log(this.searchArray)
        })
      })
    
      console.log(this.searchArray)
    }
        // console.log(e.docs[0].data()))
          




}
