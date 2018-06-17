import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimestudyComponent } from './timestudy/timestudy.component';
const routes: Routes = [
  {
    path: 'timestudy',
    component: TimestudyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
