import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, docChanges, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import {FirestoreRecord} from '../app/interfaces/FirestoreRecord'

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor(public db: AngularFirestore, public storage: AngularFireStorage, public func: AngularFireFunctions, public auth: AngularFireAuth) { }

  items: Observable<FirestoreRecord[]>;
  private itemsCollection: AngularFirestoreCollection<FirestoreRecord>;
  

  sendFileForTranscription(data): void {
    const transcribe = this.func.httpsCallable("transcribe")
    transcribe(
      {
        file: data.gsurl,
        uuid: data.uuid,
        year: data.year
      }).toPromise()
      .catch(err => console.log(err))
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

  returnAdminClaims(): boolean {
    if (this.isAuthenticated()) {
      firebase.auth().currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          //check is user has an admin custom claim
          return (!!idTokenResult.claims.admin) ? true : false
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      //user is not authenticated
      return false
    }
  }

  login(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(response => {
      this.db.collection('users-list').doc(response.user.uid).get().subscribe(obvData => {
        if (!obvData.exists) {
          //first login
          this.db.collection('users-list').doc(response.user.uid).set({
            name: response.user.displayName,
            email: response.user.email,
            textRequests: 0
          })
        }
      })
      this.getUserToken()
    })
  }

  logout(): void {
    this.auth.signOut();
    localStorage.removeItem('isLoggedIn');
  }
  
  getYears(): Observable<firebase.firestore.QuerySnapshot<any>> {  
    return this.db.collection('sermons').get()
   }
 
  getSermonFilesRecordsObv(year: string): Observable<FirestoreRecord[]> {
    this.itemsCollection = this.db.collection('sermons').doc(year).collection('items')
    return this.items = this.itemsCollection.valueChanges()
  }

}
