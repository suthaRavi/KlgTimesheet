import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { JobCategory } from '../job-category/job-category';

@Injectable()
export class JobCategoryService {
  private jobCategoryUrl = 'http://localhost:3000/job_categories/'
  constructor(private httpClient: HttpClient) {  }

  getJobCategories(): Observable<JobCategory[]> 
  {
    return this.httpClient.get<JobCategory[]>(this.jobCategoryUrl, {responseType: 'json'});
  }

  addJobCategory(jobCategory: JobCategory): Observable<JobCategory>
  {
    return this.httpClient.post<JobCategory>(this.jobCategoryUrl ,  jobCategory);
  }

  updateJobCategory(values: JobCategory): Observable<JobCategory>
  {   
    console.log("service update ", values)
      return this.httpClient.put<JobCategory>( this.jobCategoryUrl + values.id, values);         
      
  }
  deleteJobCategory(id: number) {  

    return this.httpClient.delete<JobCategory[]>( this.jobCategoryUrl + id);
            
  }

}
