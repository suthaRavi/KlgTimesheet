import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MemberModule } from './member/member.module';
import { DepartmentComponent } from './member/department/department.component';

const routes: Routes = [
 { path: 'department',
    component: DepartmentComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
