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
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule } from'@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
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
