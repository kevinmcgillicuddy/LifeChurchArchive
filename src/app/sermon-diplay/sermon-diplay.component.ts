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

  constructor(public firebaseService: FirebaseService,) { }
  // sermons$: Observable<any>;
  sermons:any[];
  ngOnInit(): void {
    // this.sermons$ = this.firebaseService.getSermonFilesObv(this.year).pipe(
    //   mergeMap(sermons => {
    //     return Promise.all(sermons.items.map(async sermon => ({
    //       name: sermon.name,
    //       metadata: await sermon.getMetadata()
    //     })))
    //   }))

  this.firebaseService.getSermonFilesRecords(this.year).then(docs=>{
    docs.forEach(e=> this.sermons=e.data())
  })

  }

}
