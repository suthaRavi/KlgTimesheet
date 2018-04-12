import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BootstrapModule } from '../bootstrap/bootstrap.module';

import { MemberComponent } from './member/member.component';
import { MemberService } from './member/member.service';
import { DepartmentComponent } from './department/department.component';
import { DepartmentService } from './department/department.service';
import { RoleComponent } from './role/role.component';
import { RoleService } from './role/role.service';
import { StatusComponent } from './status/status.component';
import { StatusService } from './status/status.service';
import { MemberCategoryComponent } from './member-category/member-category.component';
import { MemberCategoryService } from './member-category/member-category.service';

import { MemberRoutingModule } from './member-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BootstrapModule,
    ReactiveFormsModule,
    MemberRoutingModule
  ],  
  declarations: [MemberComponent, DepartmentComponent, RoleComponent, 
    StatusComponent, MemberCategoryComponent],
  providers: [MemberService, DepartmentService, RoleService, StatusService, 
    MemberCategoryService],
  
})
export class MemberModule { }
