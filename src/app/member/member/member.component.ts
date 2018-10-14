import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
//import { BootstrapModule } from '../../bootstrap/bootstrap.module';
import { forkJoin } from 'rxjs/observable/forkJoin';

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
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  @Input('member-mode') memberMode: 'Add' | 'Update' = 'Add';
  @ViewChild('template') template: TemplateRef<any>
  isInsert: boolean = true;
  members: Member[];
  member: Member = new Member;
  departments: Department[];
  memberCategories: MemberCategory[];
  roles: Role[];
  statuses: Status[];
  memberForm: FormGroup;

  modalRef: BsModalRef;
  
  constructor(private memberService: MemberService, private modalService: BsModalService, 
     private fb: FormBuilder, private departmentService: DepartmentService, private memberCategoryService: MemberCategoryService,
      private roleService: RoleService, private statusService: StatusService) { 


       }

  ngOnInit() {
   // this.getMembers();
    this.memberForm = this.fb.group({
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
      status: ['']
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

  getMembers(){
    this.memberService.getMembers().subscribe(
      results =>{
        this.members = results;
        console.log("Member ", this.members);
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
    
    this.memberMode = mode;
    if(mode == 'Add'){
       this.isInsert = true;
      this.member = new Member;
    }
     if(mode == 'Update'){
       this.isInsert = false;
       this.member = value;
        console.log("From Update ", this.member);
    }
    console.log("Mode " + this.isInsert);
      this.modalRef = this.modalService.show(this.template)
    //  this.modalAction.emit({action:"modal",params:['open']});
  }
 
  addMember(member){
    console.log("Add member ", member.code );
    console.log("Join date ", member.join_date);
    this.memberService.addMember(member).subscribe(            
                            res =>{   
                                this.members.push(res); 
                                this.member= new Member;
                                this.modalService.hide(1);                      
                               // this.closeModal(); 
                             //  this.modalAction.emit({action:"modal",params:['close']});                                                     
                            }, 
                                                                               
                            (err: HttpErrorResponse) => {
                              if(err.error instanceof Error){
                                console.log(' client error ', err.error.message);
                              }else{
                                console.log('  Backend returned status code: ', err.status);
                                console.log('  Response body: ', err.error);
                              }
                              this.modalService.hide(1); 
                            });    
                  
  }

  updateMember(value: Member)
  {

    this.memberService.updateMember(this.member).subscribe
    (
      response => 
      {
        this.member = response
        this.modalService.hide(1);
      },
      (err: HttpErrorResponse) => 
      {
        if(err.error instanceof Error){
          console.log(' client error ', err.error.message);
        }else{
          console.log('  Backend returned status code: ', err.status);
          console.log('  Response body: ', err.error);
        }
        this.modalService.hide(1); 
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
            { //this.members = response;
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
              this.modalService.hide(1); 
            } 
        )
      }
      else{
      }
  }


}
