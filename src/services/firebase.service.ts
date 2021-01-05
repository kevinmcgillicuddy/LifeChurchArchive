import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor(public db: AngularFirestore, public storage: AngularFireStorage, public func: AngularFireFunctions, public auth: AngularFireAuth) { }

  sendFileForTranscription(data): void {
    const transcribe = this.func.httpsCallable("transcribe")
    transcribe(
      {
        file: data.gsurl,
        uuid: data.uuid
      }).toPromise().catch(err => console.log('error ' + err))
  }

  generateUUID(): string {
    return Math.random().toString(36).substring(2);
  }

  getText(uuid: string): Promise<firebase.firestore.QuerySnapshot<unknown>> {
    return this.db.collection('sermons').ref.where(`uuid`, '==', `${uuid}`).get()
  }

  getUserToken(): void {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          localStorage.setItem('isLoggedIn', token);
        }
      )
    localStorage.getItem('isLoggedIn');
  }

  isAuthenticated(): boolean {
    return (localStorage.getItem('isLoggedIn')) ? true : false;
  }

  login(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(response => {
      this.getUserToken()
    })
  }

  logout(): void {
    this.auth.signOut();
    localStorage.removeItem('isLoggedIn');
  }

  getFolders(): Observable<number[]> {
    return of([2010,2011,2012,2013,2014,2015,2016,2017,2018, 2019, 2020,2021])
  }

  getSermonFilesRecords(year: number): any {
    return this.db.collection('sermons').ref.where(`year`, '==', year).get()
    // const query = this.db.collection('sermons').ref.where(`year`, '==', year)
    // const sermons = []
    // query.onSnapshot(querySnapshot => {
    //   querySnapshot.docs.forEach(element => {
    //      sermons.push(element.data())
    //   });
    // })
    // return sermons
  }

}