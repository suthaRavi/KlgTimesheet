import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @Input('customer-mode') customerMode: 'Add' | 'Update' = 'Add';
  @ViewChild('template') template: TemplateRef<any>
  private isInsert: boolean = true;
  customers: Customer[];
  private customer: Customer = new Customer;

  private customerForm: FormGroup;

  modalRef: BsModalRef;

  constructor(private customerService: CustomerService,
    private modalService: BsModalService, private fb: FormBuilder) {  }

  ngOnInit() {
    this.getCustomers();
    this.customerForm = this.fb.group({
      customer_id: ['', Validators.required],
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      fax: ['', Validators.required]
    });
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(
      results =>{
        this.customers = results;
        console.log("Customer ", this.customers);
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
  presentCustomerDialog(mode?: 'Add' | 'Update', value?: Customer ){
    console.log("** " + mode);
    
    this.customerMode = mode;
    if(mode == 'Add'){
       this.isInsert = true;
      this.customer = new Customer;
    }
     if(mode == 'Update'){
       this.isInsert = false;
       this.customer = value;
        console.log("From Update ", this.customer);
    }
    console.log("Mode " + this.isInsert);
      this.modalRef = this.modalService.show(this.template)
    //  this.modalAction.emit({action:"modal",params:['open']});
  }
 
  addCustomer(customer){
    console.log("Add customer ", customer.code );
    
    this.customerService.addCustomer(customer).subscribe(            
                            res =>{   
                                this.customers.push(res); 
                                this.customer= new Customer;
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

  updateCustomer(value: Customer)
  {

    this.customerService.updateCustomer(this.customer).subscribe
    (
      response => 
      {
        this.customer = response
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

  removeCustomer(customer)
  {
      if(confirm("Do you want delete Customer id " + customer.customer_id) == true)
      {
        console.log("remove " + customer.customer_id); 
        let id = customer.id;     
        this.customerService.deleteCustomer(id).subscribe(
            response => 
            { //this.customers = response;
              this.customers = this.customers.filter(customer => customer.id !== id)
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
