import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Role } from './role';
import { RoleService } from './role.service';

@Component({
  selector: 'role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  @Input('role-mode') roleMode: 'Add' | 'Update' = 'Add';
  @ViewChild('template') template: TemplateRef<any>
  private isInsert: boolean = true;
  roles: Role[];
  private role: Role = new Role;

  private roleForm: FormGroup;

  modalRef: BsModalRef;

  constructor(private roleService: RoleService,
    private modalService: BsModalService, private fb: FormBuilder) {  }

  ngOnInit() {
    this.getRoles();
    this.roleForm = this.fb.group({
      code: [''],
      name: ['']
    });
  }
  getRoles(){
    this.roleService.getRoles().subscribe(
      results =>{
        this.roles = results;
        console.log("Role ", this.roles);
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
  presentRoleDialog(mode?: 'Add' | 'Update', value?: Role ){
    console.log("** " + mode);
    
    this.roleMode = mode;
    if(mode == 'Add'){
       this.isInsert = true;
      this.role = new Role;
    }
     if(mode == 'Update'){
       this.isInsert = false;
       this.role = value;
        console.log("From Update ", this.role);
    }
    console.log("Mode " + this.isInsert);
      this.modalRef = this.modalService.show(this.template)
    //  this.modalAction.emit({action:"modal",params:['open']});
  }
 
  addRole(role){
    console.log("Add role ", role.code );
    
    this.roleService.addRole(role).subscribe(            
                            res =>{   
                                this.roles.push(res); 
                                this.role= new Role;
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

  updateRole(value: Role)
  {

    this.roleService.updateRole(this.role).subscribe
    (
      response => 
      {
        this.role = response
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

  removeRole(role)
  {
      if(confirm("Do you want delete Role id " + role.id) == true)
      {
        console.log("remove " + role.id); 
        let id = role.id;     
        this.roleService.deleteRole(role.id).subscribe(
            response => 
            { //this.roles = response;
              this.roles = this.roles.filter(role => role.id !== id)
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
