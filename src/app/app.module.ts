import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { LogInComponent } from './components/modals/log-in/log-in.component';
import { AlertsContainerComponent } from './components/alerts-container/alerts-container.component';
import { AboutComponent } from './components/sections/about/about.component';
import { AboutEditorComponent } from './components/modals/about-editor/about-editor.component';
import { ThumbnailContainerComponent } from './components/modals/thumbnail-container/thumbnail-container.component';
import { EducationExperiencesComponent } from './components/sections/education-experiences/education-experiences.component';
import { EducExpCardComponent } from './components/sections/education-experiences/educ-exp-card/educ-exp-card.component';
import { EducExpEditorComponent } from './components/modals/educ-exp-editor/educ-exp-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogInComponent,
    AlertsContainerComponent,
    AboutComponent,
    AboutEditorComponent,
    ThumbnailContainerComponent,
    EducationExperiencesComponent,
    EducExpCardComponent,
    EducExpEditorComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
