import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, docChanges, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { FirestoreRecord } from '../app/interfaces/FirestoreRecord'

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  constructor(public db: AngularFirestore, public storage: AngularFireStorage, public func: AngularFireFunctions, public auth: AngularFireAuth) { }

  items: Observable<FirestoreRecord[]>;
  private itemsCollection: AngularFirestoreCollection<FirestoreRecord>;

  isAuthenticated(): boolean {
    return (localStorage.getItem('isLoggedIn')) ? true : false;
  }

  sendFileForTranscription(data: FirestoreRecord): Promise<void> {
    if (this.isAuthenticated()) {
      this.db.collection('sermons').doc(data.year as unknown as string).collection('items').doc(data.uuid).update({ text: 'Waiting for transcription to finish' })
      const transcribe = this.func.httpsCallable("transcribe")
      transcribe(
        {
          file: data.gsurl,
          uuid: data.uuid,
          year: data.year
        }).toPromise()
        .catch(err => console.log(err))
    }
    else {
      return Promise.reject({ title: 'Error', text: 'You must be logged in' })
    }
  }

  generateUUID(): string {
    return Math.random().toString(36).substring(2);
  }

  getText(uuid: string, year: string): Promise<firebase.firestore.QuerySnapshot<unknown>> {
    return this.db.collection('sermons').doc(year).collection('items').ref.where(`uuid`, '==', `${uuid}`).get()
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

  returnAdminClaims(): Promise<firebase.auth.IdTokenResult> {
    if (this.isAuthenticated()) {
      return firebase.auth().currentUser.getIdTokenResult()
    }
    else {
      //user is not authenticated
      return Promise.reject()
    }
  }

  setUser(response: firebase.auth.UserCredential):void{
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
  }

  async login(providerInput:string): Promise<firebase.auth.UserCredential> {
  
   switch(providerInput){
    
    case 'google':
     let GoogleAuthResponse = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
     this.setUser(GoogleAuthResponse)
     return Promise.resolve(GoogleAuthResponse) 
    
     case 'microsoft':
      var provider = new firebase.auth.OAuthProvider('microsoft.com');
      let MSAuthResponse = await firebase.auth().signInWithPopup(provider)
        this.setUser(MSAuthResponse)
        return Promise.resolve(MSAuthResponse) 
   }


  }

  logout(): void {
    this.auth.signOut();
    localStorage.removeItem('isLoggedIn');
  }

  getYears(): Observable<firebase.firestore.QuerySnapshot<any>> {
    let res = this.db.collection('sermons').doc('2018').collection('items').ref.where('uuid', '==', 'm27mtkt20ls').get()
    res.then(snapshot => {
      snapshot.forEach(doc => doc.id)
    })
    return this.db.collection('sermons').get()
  }

  getSermonFilesRecordsObv(year: string): Observable<FirestoreRecord[]> {
    this.itemsCollection = this.db.collection('sermons').doc(year).collection('items')
    return this.items = this.itemsCollection.valueChanges()
  }




}
