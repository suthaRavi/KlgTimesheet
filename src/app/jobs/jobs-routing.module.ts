import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CustomerComponent } from './customer/customer.component';
import { JobComponent } from './job/job.component';
import { JobCategoryComponent } from './job-category/job-category.component';
import { JobStatusesComponent } from './job-statuses/job-statuses.component'



const jobsRoutes: Routes = [
 { path: 'customer',
    component: CustomerComponent
 },
 {
  path: 'job',
  component: JobComponent
 },
 { path: 'jobCategory',
 component: JobCategoryComponent
 },
 { path: 'jobStatus',
 component: JobStatusesComponent
 },

];

@NgModule({
  imports: [RouterModule.forChild(jobsRoutes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
