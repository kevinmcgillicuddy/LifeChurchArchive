import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

class UploadResult {
  uploadPercent?: Observable<number>;
  downloadURL?: Observable<string>;
  feedback?:string;
  metadata:object;
  fileName:string;
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(public db: AngularFirestore, public storage: AngularFireStorage, public func:AngularFireFunctions) { }

  sendFileForTranscription(data) {
    // event.target.disabled = true;
    // this.loading = true
    const transcribe = this.func.httpsCallable("transcribe")
    transcribe(
      {file:data.gsurl,
      uuid:data.uuid.customMetadata.uuid,
      contentType: data.uuid.contentType
    }).toPromise().catch(err=>console.log('error '+err))
  }

  private generateUUID() {
    return Math.random().toString(36).substring(2);
  }

  private async getMetadata(ref) {
    const metadata = await ref.getMetadata();
    if (!metadata.customMetadata) {
      return this.generateUUID();
    }
    return metadata;
  }

  private itemDoc: AngularFirestoreDocument<string>;
  item: Observable<string>;
  
  getText(uuid) {
    // return this.db.collection("sermons").doc(uuid)
    this.itemDoc = this.db.doc<string>("sermons/"+uuid)
    return this.itemDoc.valueChanges()
  }

  uploadFile(event): UploadResult {
      const uuid = this.generateUUID();
      const file = event.target.files[0];
      const filePath = `mp3/${file.name}`;
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

  createFirestoreRecord(value){
    this.db.collection('sermons').doc(value.metadata.uuid).set(value).then(res=>console.log(res))
  
  }
  getFolders(){
    return this.storage.ref('/mp3/').listAll()
  }

  getSermonFilesObv():Observable<any>{
    return this.storage.ref('/mp3/2020').listAll()
  }


  async getFiles(storageRef) {
  
    let sermons = await storageRef.listAll().toPromise()
    let files = [];
    var folder = 'mp3/2020';
    for (const sermon of sermons.items) {
      let md = await this.getMetadata(sermon)
      const url = await sermon.getDownloadURL();
      const text = await this.getText(md.customMetadata.uuid);
       const gsurl = `gs://lcarchivewebsite.appspot.com/${folder}/${sermon.name}`;
      files.push({
        ...sermon,
        name: sermon.name,
        url,
        gsurl,
        text,
        uuid: md,
      });
    }
       return files
  }

  getSermonsfromFireBase() {
    return this.getFiles(this.storage.ref('/mp3/2020'))
  }


}