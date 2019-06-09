import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TimeSheet, JobTime } from '../time-sheet/time-sheet';
@Injectable()
export class TimeSheetService {
  private timeSheetUrl = 'http://localhost:3000/time_sheets/';
  private timeStudyUrl = 'http://localhost:3000/job_times/';
//  queryString = new HttpParams();
  constructor(private httpClient: HttpClient) { }

  getTimeSheets(name: string,job_date: string): Observable<TimeSheet[]> 
  {
    let queryString = new HttpParams().set('first_name', name).set('job_date', job_date);
 // console.log("Search ", name);
  //  console.log("Timesheet get", queryString);
    return this.httpClient.get<TimeSheet[]>(this.timeSheetUrl,{params: queryString, responseType: 'json'});
  }

  addTimeSheet(timeSheet: TimeSheet): Observable<TimeSheet>
  {
    return this.httpClient.post<TimeSheet>(this.timeSheetUrl ,  timeSheet);
  }

 updateTimeSheet(values: TimeSheet, id: number): Observable<TimeSheet>
 {   
   console.log("service update ", values)
     return this.httpClient.put<TimeSheet>( this.timeSheetUrl + id, values);         
      
 }
 // deleteTimeSheet() {  

  //  return this.httpClient.delete<TimeSheet[]>( this.timeSheetUrl + id);
            
 // }

 getJobTimes(id: string): Observable<JobTime[]> {
  let queryString = new HttpParams().set('job_id', id);
  return this.httpClient.get<JobTime[]>(this.timeStudyUrl,{params: queryString, responseType: 'json'});
 }

 deleteJobTime(id: number){
   alert('Id ' + id);
   return this.httpClient.delete<JobTime[]>(this.timeStudyUrl + id);
 }

 getJobTimeByDateByJobId(job_id: string, jobDate: string){
  let queryString = new HttpParams().set('job_date', jobDate).set('job_id', job_id);
 return this.httpClient.get(this.timeSheetUrl, {params: queryString, responseType: 'json'})
}
}
