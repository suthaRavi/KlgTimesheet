import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TimeSheet } from '../time-sheet/time-sheet';
@Injectable()
export class TimeSheetService {
  private timeSheetUrl = 'http://localhost:3000/time_sheets/';
//  queryString = new HttpParams();
  constructor(private httpClient: HttpClient) { }

  getTimeSheets(name: string,job_date: string): Observable<TimeSheet[]> 
  {
    let queryString = new HttpParams().set('first_name', name).set('job_date', job_date)
 // console.log("Search ", name);
  //  console.log("Timesheet get", queryString);
    return this.httpClient.get<TimeSheet[]>(this.timeSheetUrl,{params: queryString, responseType: 'json'});
  }

  addTimeSheet(timeSheet: TimeSheet): Observable<TimeSheet>
  {
    return this.httpClient.post<TimeSheet>(this.timeSheetUrl ,  timeSheet);
  }

 // updateTimeSheet(values: TimeSheet): Observable<TimeSheet>
 // {   
  //  console.log("service update ", values)
   //   return this.httpClient.put<TimeSheet>( this.timeSheetUrl + values.id, values);         
      
//  }
 // deleteTimeSheet() {  

  //  return this.httpClient.delete<TimeSheet[]>( this.timeSheetUrl + id);
            
 // }

}
