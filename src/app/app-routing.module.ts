import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: 'timeSheet',
    component: TimeSheetComponent
  }
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
