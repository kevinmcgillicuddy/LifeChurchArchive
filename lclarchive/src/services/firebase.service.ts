import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage  } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  test:string;
  constructor(public db: AngularFirestore, public storage:AngularFireStorage ) {}

  uploadFile(event) {
    const uuid = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `mp3/2020/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file,{ customMetadata: { uuid }});
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    this.test ='Blah'
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }

  getUsers(){
    return this.db.collection('users-list').snapshotChanges();
  }

  // searchUsers(searchValue){
  //   return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
  //     .where('nameToSearch', '<=', searchValue + '\uf8ff'))
  //     .snapshotChanges()
  // }

  // searchUsersByAge(value){
  //   return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  // }

  


  // createUser(value, avatar){
  //   return this.db.collection('users').add({
  //     name: value.name,
  //     nameToSearch: value.name.toLowerCase(),
  //     surname: value.surname,
  //     age: parseInt(value.age),
  //     avatar: avatar
  //   });
  // }





  













}