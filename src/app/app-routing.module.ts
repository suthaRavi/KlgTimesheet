import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MemberModule } from './member/member.module';
import { DepartmentComponent } from './member/department/department.component';
import { MemberComponent } from './member/member/member.component';


const routes: Routes = [
 { path: 'department',
    component: DepartmentComponent
 },
 {
   path: 'member',
   component: MemberComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
