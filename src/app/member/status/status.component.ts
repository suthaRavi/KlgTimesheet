import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Status } from './status';
import { StatusService } from './status.service';

@Component({
  selector: 'status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input('status-mode') statusMode: 'Add' | 'Update' = 'Add';
  @ViewChild('template', {static: false}) template: TemplateRef<any>
  private isInsert: boolean = true;
  statuses: Status[];
  private status: Status = new Status;

  private statusForm: FormGroup;

  modalRef: BsModalRef;
  constructor(private statusService: StatusService,
    private modalService: BsModalService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getStatuss();
    this.statusForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    });
  }
  getStatuss(){
    this.statusService.getStatuses().subscribe(
      results =>{
        this.statuses = results;
        console.log("Status ", this.statuses);
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
  presentStatusDialog(mode?: 'Add' | 'Update', value?: Status ){
    console.log("** " + mode);
    
    this.statusMode = mode;
    if(mode == 'Add'){
       this.isInsert = true;
      this.status = new Status;
    }
     if(mode == 'Update'){
       this.isInsert = false;
       this.status = value;
        console.log("From Update ", this.status);
    }
    console.log("Mode " + this.isInsert);
      this.modalRef = this.modalService.show(this.template)
    //  this.modalAction.emit({action:"modal",params:['open']});
  }
 
  addStatus(status){
    console.log("Add status ", status.code );
    
    this.statusService.addStatus(status).subscribe(            
                            res =>{   
                                this.statuses.push(res); 
                                this.status= new Status;
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

  updateStatus(value: Status)
  {

    this.statusService.updateStatus(this.status).subscribe
    (
      response => 
      {
        this.status = response
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

  removeStatus(status)
  {
      if(confirm("Do you want delete Status id " + status.id) == true)
      {
        console.log("remove " + status.id); 
        let id = status.id;     
        this.statusService.deleteStatus(status.id).subscribe(
            response => 
            { //this.statuses = response;
              this.statuses = this.statuses.filter(status => status.id !== id)
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
