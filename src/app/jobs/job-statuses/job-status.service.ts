import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { JobStatus } from '../job-statuses/job-status';

@Injectable()
export class JobStatusService {
  private jobStatusUrl = 'http://localhost:3000/job_statuses/'
  constructor(private httpClient: HttpClient) {  }

  getJobStatuses(): Observable<JobStatus[]> 
  {
    return this.httpClient.get<JobStatus[]>(this.jobStatusUrl, {responseType: 'json'});
  }

  addJobStatus(jobStatus: JobStatus): Observable<JobStatus>
  {
    return this.httpClient.post<JobStatus>(this.jobStatusUrl ,  jobStatus);
  }

  updateJobStatus(values: JobStatus): Observable<JobStatus>
  {   
    console.log("service update ", values)
      return this.httpClient.put<JobStatus>( this.jobStatusUrl + values.id, values);         
      
  }
  deleteJobStatus(id: number) {  

    return this.httpClient.delete<JobStatus[]>( this.jobStatusUrl + id);
            
  }

}
