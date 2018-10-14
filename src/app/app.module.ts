import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { BootstrapModule } from './bootstrap/bootstrap.module';

import { AppComponent } from './app.component';
import { MemberModule } from './member/member.module';
import { JobsModule } from './jobs/jobs.module';
import { ReportsModule } from './reports/reports.module';

import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { TimeSheetService } from './time-sheet/time-sheet.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeSheetComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BootstrapModule,
   //BsDatepickerModule.forRoot(),
    MemberModule,
    JobsModule,
    AppRoutingModule,
    ReportsModule
  ],
  providers: [TimeSheetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
