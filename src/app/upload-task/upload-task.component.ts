import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  @Input() yearPicked: number;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, public firebaseService: FirebaseService) { }

  startUpload() {
    const path = `mp3/${this.yearPicked}/${this.file.name}`;
    const ref = this.storage.ref(path);
    const uuid = this.firebaseService.generateUUID();
    this.task = this.storage.upload(path, this.file,{customMetadata: {uuid}});
    this.percentage = this.task.percentageChanges();
    this.snapshot  = this.task.snapshotChanges().pipe(
        finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.db.collection('files').doc(uuid).set( {filename: this.file.name, downloadURL: this.downloadURL, path, uuid, gsurl:`gs://lcarchivewebsite.appspot.com/${path}`, year:this.yearPicked });
      }),
    );
  }

  ngOnInit(): void {
    this.startUpload()
  }

}
