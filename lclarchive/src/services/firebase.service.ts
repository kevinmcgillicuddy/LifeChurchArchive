import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
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

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) { }

  uploadFile(event): UploadResult {
    const uuid = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `mp3/2020/${file.name}`;
    const task = this.storage.upload(filePath, file, { customMetadata: { uuid } });
    return {
      uploadPercent: task.percentageChanges(),
      downloadURL: task.snapshotChanges().pipe(
        mergeMap(snapshot => {
          return from(snapshot.ref.getDownloadURL())
        })
      )
    };
  }

  getUsers() {
    return this.db.collection('users-list').snapshotChanges();
  }

  // getSermonsfromFireBase(year) {
  //   var folder = `/mp3/${year}`;
  //   var storageRef = this.storage.ref(folder)
  //   async function getFiles() {
  //     let files = [];
  //     let sermons = storageRef.listAll();
  //     sermons.subscribe({
  //       next(sermon) {
  //         const md = await getMetadata(sermon);
  //         const text = await getText(sermon.name);
  //         const url = await sermon.getDownloadURL();
  //         const gsurl = `gs://lcarchivewebsite.appspot.com/${folder}/${sermon.name}`;
  //         files.push({
  //           ...sermon,
  //           name: sermon.name,
  //           url,
  //           gsurl,
  //           text,
  //           uuid: md.customMetadata.uuid,
  //         });
  //       }
  //     }})


    getSermonsfromFireBase() {
    var folder = '/mp3/2020';
    var storageRef = this.storage.ref(folder)
    let files = [];
    let sermons = storageRef.listAll();
    sermons.subscribe({
        next(sermon) {console.log(sermon.items[0].getMetadata())},
        complete() {console.log('done')}
        })

      }

    }


    // for (const sermon of sermons.items) {
    //   const md = await getMetadata(sermon);
    //   const text = await getText(sermon.name);
    //   const url = await sermon.getDownloadURL();
    //   const gsurl = `gs://lcarchivewebsite.appspot.com/${folder}/${sermon.name}`;
    //   files.push({
    //     ...sermon,
    //     name: sermon.name,
    //     url,
    //     gsurl,
    //     text,
    //     uuid: md.customMetadata.uuid,
    //   });
    // }
//     return files;
//   }

//     async function getText(docID) {
//   var docRef = this.db.collection("sermons").doc(docID);
//   let doc = await docRef.get();
//   if (doc.exists) {
//     return await doc.data().text;
//   }
// }
// async function getMetadata(ref) {
//   //ref should be sermon
//   return ref.getMetadata();
// }

// getFiles().then((res) => (this.files = res));
    

