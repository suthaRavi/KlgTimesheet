import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Department } from '../department/department';
@Injectable()
export class DepartmentService {

  private departmentUrl = 'http://localhost:3000/departments/';

  constructor(private httpClient: HttpClient) { }

    getDepartments(): Observable<Department[]> 
    {
      return this.httpClient.get<Department[]>(this.departmentUrl, {responseType: 'json'});
    }

    addDepartment(department: Department): Observable<Department>
    {
      return this.httpClient.post<Department>(this.departmentUrl ,  department);
    }

    updateDepartment(values: Department): Observable<Department>
    {   
      console.log("service update ", values)
        return this.httpClient.put<Department>( this.departmentUrl + values.id, values);         
        
    }
    deleteDepartment(id: number) {
    //  this.departments = this.departments.filter(department => department.id !== id)

      return this.httpClient.delete<Department[]>( this.departmentUrl + id);
              
    }

 

}
