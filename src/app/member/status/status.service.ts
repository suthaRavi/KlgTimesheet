import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Status } from '../status/status';

@Injectable()
export class StatusService {
  private statusUrl = 'http://localhost:3000/statuses/'
  constructor(private httpClient: HttpClient ) { }

  getStatuses(): Observable<Status[]> 
    {
      return this.httpClient.get<Status[]>(this.statusUrl, {responseType: 'json'});
    }

    addStatus(status: Status): Observable<Status>
    {
      return this.httpClient.post<Status>(this.statusUrl ,  status);
    }

    updateStatus(values: Status): Observable<Status>
    {   
      console.log("service update ", values)
        return this.httpClient.put<Status>( this.statusUrl + values.id, values);         
        
    }
    deleteStatus(id: number) {
   
      return this.httpClient.delete<Status[]>( this.statusUrl + id);
              
    }



}
