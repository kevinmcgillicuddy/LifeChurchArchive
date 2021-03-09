import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Direction } from '../interfaces/HeroImage';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  constructor(public db: AngularFirestore) { }
  img:Direction;
  searchArray=[];
  ngOnInit(): void {
    this.img = Direction.Search
          

    var sermonsThatHaveText = this.db.collectionGroup('items', ref=> ref.where('text', '!=', null))
    sermonsThatHaveText.get()
    .subscribe(docs=>{
       docs.forEach(doc=>{
          this.searchArray.push(doc.data())      
      })
  })


  }


  search(){
    let newVar = this.searchArray.filter(it=>{
      console.log(it)
      return it.text.includes('hack');
 }) 
 console.log(newVar)
  }

}
