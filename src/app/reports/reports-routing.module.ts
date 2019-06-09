import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimestudyComponent } from './timestudy/timestudy.component';
import { JobReportComponent } from './job-report/job-report.component';

const routes: Routes = [
  {
    path: 'timestudy',
    component: TimestudyComponent
  },
  {
    path: 'jobReport',
    component: JobReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
