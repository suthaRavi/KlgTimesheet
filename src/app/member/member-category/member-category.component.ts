import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { MemberCategory } from './member-category';
import { MemberCategoryService } from './member-category.service';

@Component({
  selector: 'member-category',
  templateUrl: './member-category.component.html',
  styleUrls: ['./member-category.component.css']
})
export class MemberCategoryComponent implements OnInit {
  @Input('memberCategory-mode') memberCategoryMode: 'Add' | 'Update' = 'Add';
  @ViewChild('template') template: TemplateRef<any>
  private isInsert: boolean = true;
  memberCategories: MemberCategory[];
  private memberCategory: MemberCategory = new MemberCategory;

  private memberCategoryForm: FormGroup;

  modalRef: BsModalRef

  constructor(private memberCategoryService: MemberCategoryService,
    private modalService: BsModalService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.getMemberCategories();
    this.memberCategoryForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  getMemberCategories(){
    this.memberCategoryService.getMemberCategories().subscribe(
      results =>{
        this.memberCategories = results;
        console.log("MemberCategory ", this.memberCategories);
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
  presentMemberCategoryDialog(mode?: 'Add' | 'Update', value?: MemberCategory ){
    console.log("** " + mode);
    
    this.memberCategoryMode = mode;
    if(mode == 'Add'){
       this.isInsert = true;
      this.memberCategory = new MemberCategory;
    }
     if(mode == 'Update'){
       this.isInsert = false;
       this.memberCategory = value;
        console.log("From Update ", this.memberCategory);
    }
    console.log("Mode " + this.isInsert);
      this.modalRef = this.modalService.show(this.template)
    //  this.modalAction.emit({action:"modal",params:['open']});
  }
 
  addMemberCategory(memberCategory){
    console.log("Add memberCategory ", memberCategory.code );
    
    this.memberCategoryService.addMemberCategory(memberCategory).subscribe(            
                            res =>{   
                                this.memberCategories.push(res); 
                                this.memberCategory= new MemberCategory;
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

  updateMemberCategory(value: MemberCategory)
  {

    this.memberCategoryService.updateMemberCategory(this.memberCategory).subscribe
    (
      response => 
      {
        this.memberCategory = response
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

  removeMemberCategory(memberCategory)
  {
      if(confirm("Do you want delete MemberCategory id " + memberCategory.id) == true)
      {
        console.log("remove " + memberCategory.id); 
        let id = memberCategory.id;     
        this.memberCategoryService.deleteMemberCategory(memberCategory.id).subscribe(
            response => 
            { //this.memberCategories = response;
              this.memberCategories = this.memberCategories.filter(memberCategory => memberCategory.id !== id)
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
