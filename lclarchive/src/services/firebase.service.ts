import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

class UploadResult {
  uploadPercent?: Observable<number>;
  downloadURL?: Observable<string>;
  feedback?:string;
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) { }

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

  uploadFile(event): UploadResult {
      const uuid = this.generateUUID();
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


  async getFiles(storageRef) {
    let sermons = await storageRef.listAll().toPromise()
    let files = [];
    var folder = '/mp3/2020';
    for (const sermon of sermons.items) {
      let md = await this.getMetadata(sermon)
      const url = await sermon.getDownloadURL();
      //const text = await getText(sermon.name);
      const gsurl = `gs://lcarchivewebsite.appspot.com/${folder}/${sermon.name}`;
      files.push({
        ...sermon,
        name: sermon.name,
        url,
        gsurl,
        uuid: md,
      });
    }
    return files
  }

  getSermonsfromFireBase() {
    return this.getFiles(this.storage.ref('/mp3/2020'))
  }


}