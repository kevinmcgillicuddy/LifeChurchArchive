import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage  } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

class UploadResult {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore, public storage:AngularFireStorage ) {}

  uploadFile(event): UploadResult {
    const uuid = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `mp3/2020/${file.name}`;
    const task = this.storage.upload(filePath, file,{ customMetadata: { uuid }});
    return {
      uploadPercent: task.percentageChanges(),
      downloadURL: task.snapshotChanges().pipe(
        mergeMap(snapshot => {
          return from(snapshot.ref.getDownloadURL())
        })
      )
    };
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