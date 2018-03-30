import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { MemberComponent } from './member/member.component';
import { MemberService } from './member/member.service';
import { DepartmentComponent } from './department/department.component';
import { DepartmentService } from './department/department.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],  
  declarations: [MemberComponent, DepartmentComponent],
  providers: [MemberService, DepartmentService],
  
})
export class MemberModule { }
