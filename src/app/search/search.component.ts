import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/compat/firestore';
import { FirestoreRecord } from '../interfaces/FirestoreRecord';
import { Direction } from '../interfaces/HeroImage';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public db: AngularFirestore) { }
  img:Direction;
  searchArray: Array<any> =[];
  filterSermons: Array<FirestoreRecord> =[];
  currentItem:string = '' ;

  ngOnInit(): void {
    this.img = Direction.Search
    let sermonsThatHaveText:AngularFirestoreCollectionGroup<unknown> = this.db.collectionGroup('items', ref=> ref.where('text', '!=', null))
    sermonsThatHaveText.get()
    .subscribe(docs=>{
       docs.forEach(doc=>{
          this.searchArray.push(doc.data())
      })
  })
  }

  getValue(target: EventTarget): string {
    this.search((target as HTMLInputElement).value.toLocaleLowerCase())
    return (target as HTMLInputElement).value;
  }

  search(searchInput:string):void{
    this.filterSermons = this.searchArray.filter(item=>{
      return item.text.includes(searchInput);
       })
  }

}
