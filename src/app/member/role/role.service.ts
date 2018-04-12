import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Role } from '../role/role';

@Injectable()
export class RoleService {
  private roleUrl = 'http://localhost:3000/roles/'
  constructor(private httpClient: HttpClient) {  }
  getRoles(): Observable<Role[]> 
  {
    return this.httpClient.get<Role[]>(this.roleUrl, {responseType: 'json'});
  }

  addRole(role: Role): Observable<Role>
  {
    return this.httpClient.post<Role>(this.roleUrl ,  role);
  }

  updateRole(values: Role): Observable<Role>
  {   
    console.log("service update ", values)
      return this.httpClient.put<Role>( this.roleUrl + values.id, values);         
      
  }
  deleteRole(id: number) {
  //  this.roles = this.roles.filter(role => role.id !== id)

    return this.httpClient.delete<Role[]>( this.roleUrl + id);
            
  }


}
