import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Job } from '../job/job';

@Injectable()
export class JobService {

  private jobUrl = 'http://localhost:3000/jobs/';

  constructor(private httpClient: HttpClient) { }

  getJobs(): Observable<Job[]> 
    {
      return this.httpClient.get<Job[]>(this.jobUrl, {responseType: 'json'});
    }

    addJob(job: Job): Observable<Job>
    {
      return this.httpClient.post<Job>(this.jobUrl ,  job);
    }

    updateJob(values: Job): Observable<Job>
    {   
      console.log("service update ", values)
        return this.httpClient.put<Job>( this.jobUrl + values.id, values);         
        
    }
    deleteJob(id: number) {
    
      return this.httpClient.delete<Job[]>( this.jobUrl + id);
              
    }



}
