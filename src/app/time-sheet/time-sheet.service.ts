import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TimeSheet } from '../time-sheet/time-sheet';
@Injectable()
export class TimeSheetService {
  private timeSheetUrl = 'http://localhost:3000/time_sheets/'
  constructor(private httpClient: HttpClient) { }

  getJobCategories(): Observable<TimeSheet[]> 
  {
    return this.httpClient.get<TimeSheet[]>(this.timeSheetUrl, {responseType: 'json'});
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
