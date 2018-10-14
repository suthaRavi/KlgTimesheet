import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { CustomerComponent } from './customer/customer.component';
import { CustomerService } from './customer/customer.service';
import { JobComponent } from './job/job.component';
import { JobService } from './job/job.service';
import { JobCategoryComponent } from './job-category/job-category.component';
import { JobCategoryService } from './job-category/job-category.service';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobStatusesComponent } from './job-statuses/job-statuses.component';
import { JobStatusService } from './job-statuses/job-status.service';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BootstrapModule,
    JobsRoutingModule
  ],
  declarations: [CustomerComponent, JobComponent, 
    JobCategoryComponent, JobStatusesComponent],
    providers: [CustomerService, JobService, JobCategoryService,
                  JobStatusService]
})
export class JobsModule { }
