import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Department } from './department';
import { DepartmentService } from './department.service';
@Component({
  selector: 'department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  
  @Input('department-mode') departmentMode: 'Add' | 'Update' = 'Add';
  @ViewChild('template') template: TemplateRef<any>
  private isInsert: boolean = true;
  departments: Department[];
  private department: Department = new Department;

  private departmentForm: FormGroup;

  modalRef: BsModalRef;

  constructor(private departmentService: DepartmentService,
    private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getDepartments();
    this.departmentForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    });

  }

  getDepartments(){
    this.departmentService.getDepartments().subscribe(
      results =>{
        this.departments = results;
        console.log("Department ", this.departments);
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
  presentDepartmentDialog(mode?: 'Add' | 'Update', value?: Department ){
    console.log("** " + mode);
    
    this.departmentMode = mode;
    if(mode == 'Add'){
       this.isInsert = true;
      this.department = new Department;
    }
     if(mode == 'Update'){
       this.isInsert = false;
       this.department = value;
        console.log("From Update ", this.department);
    }
    console.log("Mode " + this.isInsert);
      this.modalRef = this.modalService.show(this.template)
    //  this.modalAction.emit({action:"modal",params:['open']});
  }
 
  addDepartment(department){
    console.log("Add department ", department.code );
    
    this.departmentService.addDepartment(department).subscribe(            
                            res =>{   
                                this.departments.push(res); 
                                this.department= new Department;
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

  updateDepartment(value: Department)
  {

    this.departmentService.updateDepartment(this.department).subscribe
    (
      response => 
      {
        this.department = response
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

  removeDepartment(department)
  {
      if(confirm("Do you want delete Department id " + department.id) == true)
      {
        console.log("remove " + department.id); 
        let id = department.id;     
        this.departmentService.deleteDepartment(department.id).subscribe(
            response => 
            { //this.departments = response;
              this.departments = this.departments.filter(department => department.id !== id)
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
