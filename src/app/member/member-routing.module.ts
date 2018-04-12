import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DepartmentComponent } from './department/department.component';
import { MemberComponent } from './member/member.component';
import { MemberCategoryComponent } from './member-category/member-category.component';
import { RoleComponent } from './role/role.component';
import { StatusComponent } from './status/status.component';



const memberRoutes: Routes = [
 { path: 'department',
    component: DepartmentComponent
 },
 {
  path: 'member',
  component: MemberComponent
 },
 { path: 'memberCategory',
 component: MemberCategoryComponent
 },
{ path: 'role',
component: RoleComponent
 },
 { path: 'status',
component: StatusComponent
 },

];

@NgModule({
  imports: [RouterModule.forChild(memberRoutes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
