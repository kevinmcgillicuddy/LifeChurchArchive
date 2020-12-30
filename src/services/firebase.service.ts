import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {FirestoreRecord} from '../app/interfaces/FirestoreRecord'
import {UploadResult} from '../app/interfaces/UploadResult'



@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(public db: AngularFirestore, public storage: AngularFireStorage, public func:AngularFireFunctions, public auth: AngularFireAuth) { }

  sendFileForTranscription(data):void {
    const transcribe = this.func.httpsCallable("transcribe")
    transcribe(
      {file:data.metadata.gsurl,
      uuid:data.metadata.uuid
    }).toPromise().catch(err=>console.log('error '+ err))
  }

  private generateUUID():string {
    return Math.random().toString(36).substring(2);
  }
  private itemDoc: AngularFirestoreDocument<string>;
  item: Observable<string>;


  getText(uuid:string):Promise<firebase.firestore.QuerySnapshot<unknown>>{
    return this.db.collection('sermons').ref.where(`metadata.uuid`,'==',`${uuid}`).get()
   }

  uploadFile(event,yearPicked): UploadResult {
    if (!yearPicked) {yearPicked === 2019} 
      const uuid = this.generateUUID();
      const file = event.target.files[0];
      const filePath = `mp3/${yearPicked}/${file.name}`;
      const metadata = {uuid, gsurl: `gs://lcarchivewebsite.appspot.com/${filePath}` }
      const task = this.storage.upload(filePath, file, {customMetadata: metadata });
       return {
        metadata,
        fileName: file.name,
        uploadPercent: task.percentageChanges(),
        downloadURL: task.snapshotChanges().pipe(
          mergeMap(snapshot => {
            return from(snapshot.ref.getDownloadURL())
          })
        )
      };
  }
  
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

  createFirestoreRecord(record:FirestoreRecord):void{
    this.db.collection('sermons').doc(record.metadata.uuid).set(record)  
  }

  getFolders():Observable<number[]>{
    return of([2018,2019,2020])
  }

  getSermonFilesRecords(year:number):Promise<firebase.firestore.QuerySnapshot<unknown>>{
   return this.db.collection('sermons').ref.where(`year`,'==',year).get()
  }

}