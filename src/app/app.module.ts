import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//css
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule } from'@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component';
import { SermonDiplayComponent } from './sermon-diplay/sermon-diplay.component';
import { TextDiplayDialogComponent } from './text-diplay-dialog/text-diplay-dialog.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UploadTaskComponent } from './upload-task/upload-task.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadFileDialogComponent,
    SermonDiplayComponent,
    TextDiplayDialogComponent,
    AuthenticationComponent,
    UploadTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    AngularFireAuthModule,
    MatTabsModule,
    MatDialogModule,
    MatRadioModule,
    MatIconModule,
    MatGridListModule,
    MatProgressBarModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
