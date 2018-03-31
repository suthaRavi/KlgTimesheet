import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Member } from '../member/member';
import { MemberService } from '../member/member.service';

@Component({
  selector: 'member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  @Input('member-mode') memberMode: 'Add' | 'Update' = 'Add';
  @ViewChild('template') template: TemplateRef<any>
  private isInsert: boolean = true;
  members: Member[];
  private member: Member = new Member;

  private memberForm: FormGroup;

  modalRef: BsModalRef;

  constructor(private memberService: MemberService,
    private modalService: BsModalService, private fb: FormBuilder) {  }

  ngOnInit() {
    this.getMembers();
    this.memberForm = this.fb.group({
      member_id: [''],
      first_name: ['']
    });
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
      if(confirm("Do you want delete Member id " + member.id) == true)
      {
        console.log("remove " + member.id); 
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
