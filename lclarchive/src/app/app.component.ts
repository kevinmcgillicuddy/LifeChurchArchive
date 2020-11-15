  
import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lclarchive';
  items: Array<any>;

  constructor(
    public firebaseService: FirebaseService  ) { }


 ngOnInit() {
   this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
    })
  }
}
