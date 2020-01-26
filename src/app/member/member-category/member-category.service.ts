import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MemberCategory } from '../member-category/member-category';
@Injectable()
export class MemberCategoryService {
  private memberCategoryUrl = 'http://localhost:3000/categories/'
  constructor(private httpClient: HttpClient) { }

  getMemberCategories(): Observable<MemberCategory[]> 
  {
    return this.httpClient.get<MemberCategory[]>(this.memberCategoryUrl, {responseType: 'json'});
  }

  addMemberCategory(memberCategory: MemberCategory): Observable<MemberCategory>
  {
    return this.httpClient.post<MemberCategory>(this.memberCategoryUrl ,  memberCategory);
  }

  updateMemberCategory(values: MemberCategory): Observable<MemberCategory>
  {   
    console.log("service update ", values)
      return this.httpClient.put<MemberCategory>( this.memberCategoryUrl + values.id, values);         
      
  }
  deleteMemberCategory(id: number) {  

    return this.httpClient.delete<MemberCategory[]>( this.memberCategoryUrl + id);
            
  }

}