import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Customer } from './customer'
@Injectable()
export class CustomerService {

  private customerUrl = 'http://localhost:3000/customers/';
  constructor(private httpClient: HttpClient ) { }

  getCustomers(): Observable<Customer[]> 
  {
    return this.httpClient.get<Customer[]>(this.customerUrl, {responseType: 'json'});
  }

  addCustomer(customer: Customer): Observable<Customer>
  {
    return this.httpClient.post<Customer>(this.customerUrl ,  customer);
  }

  updateCustomer(values: Customer): Observable<Customer>
  {   
    console.log("service update ", values)
      return this.httpClient.put<Customer>( this.customerUrl + values.id, values);         
      
  }
  deleteCustomer(id: number) {
  
    return this.httpClient.delete<Customer[]>( this.customerUrl + id);
            
  }

}
