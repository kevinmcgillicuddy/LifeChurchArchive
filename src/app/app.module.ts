import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//css
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import {FormsModule } from'@angular/forms';
import {MatLegacyTabsModule as MatTabsModule} from '@angular/material/legacy-tabs';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatExpansionModule} from '@angular/material/expansion';
//firebase
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { environment } from '../environments/environment';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component';
import { SermonDiplayComponent } from './sermon-diplay/sermon-diplay.component';
import { TextDiplayDialogComponent } from './text-diplay-dialog/text-diplay-dialog.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeBlockComponent } from './welcome-block/welcome-block.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { HighlightPipe } from './highlight.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UploadFileDialogComponent,
    SermonDiplayComponent,
    TextDiplayDialogComponent,
    AuthenticationComponent,
    UploadTaskComponent,
    WelcomeBlockComponent,
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    HomeComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule ,
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    MatTabsModule,
    MatDialogModule,
    MatRadioModule,
    MatExpansionModule,
    MatIconModule,
    MatGridListModule,
    MatProgressBarModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule
  ],
  providers: [MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
