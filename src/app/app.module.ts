import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';

import { AppComponent } from './app.component';
import { MemberModule } from './member/member.module';
import { JobsModule } from './jobs/jobs.module';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';


@NgModule({
  declarations: [
    AppComponent,
    TimeSheetComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    ReactiveFormsModule,
    BootstrapModule,
    MemberModule,
    JobsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
