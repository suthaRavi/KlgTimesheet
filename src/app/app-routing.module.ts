import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeSheetComponent } from './time-sheet/time-sheet.component';


const routes: Routes = [
  {
    path: 'timesheet',
    component: TimeSheetComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
