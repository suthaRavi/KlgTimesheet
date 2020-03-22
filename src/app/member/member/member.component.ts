import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
//import { BootstrapModule } from '../../bootstrap/bootstrap.module';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';

import { Member } from '../member/member';
import { MemberService } from '../member/member.service';
import { Department } from '../department/department';
import { DepartmentService } from '../department/department.service';
import { MemberCategory } from '../member-category/member-category';
import { MemberCategoryService } from '../member-category/member-category.service';
import { Role } from '../role/role';
import { RoleService } from '../role/role.service';
import {Status } from '../status/status';
import { StatusService } from '../status/status.service';



@Component({
  selector: 'member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
  providers: [ DatePipe]
})
export class MemberComponent implements OnInit {
  @Input('member-mode') memberMode: 'Add' | 'Update' = 'Add';
  @ViewChild('template', {static: false}) template: TemplateRef<any>
  isInsert: boolean = true;
  members: Member[];
 // member: Member = new Member;
  departments: Department[];
  memberCategories: MemberCategory[];
  roles: Role[];
  statuses: Status[];
  memberForm: FormGroup;

  modalRef: BsModalRef;
   
  constructor(private memberService: MemberService, private modalService: BsModalService, 
     private fb: FormBuilder, private departmentService: DepartmentService, private memberCategoryService: MemberCategoryService,
      private roleService: RoleService, private statusService: StatusService, private datePipe: DatePipe) { 

       }

  ngOnInit() {
   // this.getMembers();
    this.memberForm = this.fb.group({
      id: [],
      member_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      reporting_id: ['', Validators.required],
      join_date: [, Validators.required],
      end_date: null,
      category: ['', Validators.required],
      pay_rate: ['', Validators.required],
      status: [''],
      created_at: null,
      updated_at: null
    });
    this.getResources();
  }
  getResources(){
    let mem = this.memberService.getMembers();
    let dep = this.departmentService.getDepartments();
    let memCat = this.memberCategoryService.getMemberCategories();
    let rol = this.roleService.getRoles();
    let sta = this.statusService.getStatuses();
    forkJoin([ mem, dep, memCat, rol, sta 
    ]).subscribe(
        results => {
          console.log(" Member " , results[0]);
          this.members = results[0];
          this.departments = results[1];
          console.log("Department  ", results[1]);
          this.memberCategories = results[2];
          console.log(" Member category ", results[2]);
          this.roles = results[3];
          console.log("Role ", results[3]);
          this.statuses = results[4];
          console.log("Status ", results[4]);

        }, 
        (err: HttpErrorResponse) => {
          if(err.error instanceof Error){
          console.log(' client error ', err.error.message);
          }else{
          console.log('  Backend returned status code: ', err.status);
          console.log('  Response body: ', err.error);
          }
        }

      )

  }

  presentMemberDialog(mode?: 'Add' | 'Update', value?: Member ){
    console.log("** " + mode);
    console.log(" ### for update " + Object.values(value));
    this.memberMode = mode;
    if(mode == 'Add'){
       this.isInsert = true;
      }
     if(mode == 'Update'){
       this.isInsert = false;
       console.log("** join date Stringfy " + JSON.stringify(value.join_date));
      this.memberForm.setValue(value);
      console.log("Member form join_date " + (this.memberForm.controls.join_date.value));
      this.memberForm.controls['join_date'].setValue(this.datePipe.transform(value.join_date, 'MM/dd/yyyyy'));
      console.log("Member form join_date After " + (this.memberForm.controls.join_date.value));
    }
    console.log("Mode " + this.isInsert);
      this.modalRef = this.modalService.show(this.template)
    //  this.modalAction.emit({action:"modal",params:['open']});
  }
 
  addMember(member: Member){
    //console.log("Add member ", member.code );
    console.log("Join date ", member.join_date);
    this.memberService.addMember(member).subscribe(            
                            res =>{   
                                this.members.push(res); 
                                this.memberForm.reset();
                                this.closeModal();                  
                                                   
                            }, 
                                                                               
                            (err: HttpErrorResponse) => {
                              if(err.error instanceof Error){
                                console.log(' client error ', err.error.message);
                              }else{
                                console.log('  Backend returned status code: ', err.status);
                                console.log('  Response body: ', err.error);
                              }
                              //this.modalService.hide(1); 
                              this.closeModal(); 
                            });    
                  
  }

  updateMember(value: Member)
  {
    console.log("Update Member "+ Object.values(value));   
    this.memberService.updateMember(value).subscribe
    (
      response => 
      {
        this.members.splice(value.id-1,1, value);
        this.memberForm.reset();
        this.closeModal();
      },
      (err: HttpErrorResponse) => 
      {
        if(err.error instanceof Error){
          console.log(' client error ', err.error.message);
        }else{
          console.log('  Backend returned status code: ', err.status);
          console.log('  Response body: ', err.error);
        }
         this.closeModal(); 
      } 
    )
   
  }

  removeMember(member)
  {
      if(confirm("Do you want delete Member id " + member.member_id) == true)
      {
        console.log("remove " + member.member_id); 
        let id = member.id;     
        this.memberService.deleteMember(member.id).subscribe(
            response => 
            { 
              this.members = this.members.filter(member => member.id !== id)
            },
            (err: HttpErrorResponse) => 
            {
              if(err.error instanceof Error){
                console.log(' client error ', err.error.message);
              }else{
                console.log('  Backend returned status code: ', err.status);
                console.log('  Response body: ', err.error);
              }
              //this.modalService.hide(1); 
              this.closeModal();
            } 
        )
      }
      else{
      }
  }
closeModal(){
  this.memberForm.reset()
  this.modalService.hide(1);
}

}
