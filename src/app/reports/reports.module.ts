import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { BootstrapModule } from '../bootstrap/bootstrap.module';

import { ReportsRoutingModule } from './reports-routing.module';
import { TimestudyComponent } from './timestudy/timestudy.component';
import { JobReportComponent } from './job-report/job-report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    BootstrapModule
  ],
  declarations: [TimestudyComponent, JobReportComponent]
})
export class ReportsModule { }
