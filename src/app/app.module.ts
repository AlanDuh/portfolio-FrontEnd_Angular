import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { LogInComponent } from './components/modals/log-in/log-in.component';
import { AlertsContainerComponent } from './components/alerts-container/alerts-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogInComponent,
    AlertsContainerComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
