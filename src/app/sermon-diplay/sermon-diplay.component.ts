import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-sermon-diplay',
  templateUrl: './sermon-diplay.component.html',
  styleUrls: ['./sermon-diplay.component.css']
})
export class SermonDiplayComponent implements OnInit {

  @Input() year: string;
  
  @Output() textPopOut: EventEmitter<string> =
  new EventEmitter<string>();

  constructor(public firebaseService: FirebaseService,) { }
  sermons:any;
  text:any;
  
  goToDownloadPage(href) { window.open(`${href}`,'_blank')};

  getText(uuid:string):void{
      this.firebaseService.getText(uuid).then(docs=>{
      this.text = docs.docs.map(e=>e.data())
      console.log(this.text[0].text)
      this.textPopOut.emit(this.text[0].text)
      })
  }
//emit an event to parent container to send the file to a modal on that window
  ngOnInit(): void {


  this.firebaseService.getSermonFilesRecords(this.year).then(docs=>{
    this.sermons = docs.docs.map(e=>e.data())}
    )
 


  }
}

