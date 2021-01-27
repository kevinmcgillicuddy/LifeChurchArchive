import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  @Input() yearPicked: string;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  feedback: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, public firebaseService: FirebaseService, public auth: FirebaseService) { }

  async startUpload() {
    //check auth
    let isAdmin = await this.firebaseService.returnAdminClaims()
    if (isAdmin.claims.admin) {
      this.feedback = null;
      const path = `mp3/${this.yearPicked}/${this.file.name}`;
      const ref = this.storage.ref(path);
      const uuid = this.firebaseService.generateUUID();
      this.task = this.storage.upload(path, this.file, { customMetadata: { uuid } });
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges().pipe(
        finalize(async () => {
          this.downloadURL = await ref.getDownloadURL().toPromise();
          let date = new Date()
          this.db.collection('sermons').doc(this.yearPicked).collection('items').add({ created: date, filename: this.file.name, downloadURL: this.downloadURL, path, uuid, gsurl: `gs://lcarchivewebsite.appspot.com/${path}`, year: this.yearPicked });
        }),
      );
    }
    else {
      this.feedback = "You must sign in and be an admin to upload files";
    }
  }

  ngOnInit(): void {
    this.startUpload()
  }

}
