import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Member } from '../member/member';

@Injectable()
export class MemberService {

 private memberUrl = "http://localhost:3000/members/"

  constructor(private httpClient: HttpClient) {  }

  getMembers(): Observable<Member[]> 
  {
    return this.httpClient.get<Member[]>(this.memberUrl, {responseType: 'json'});
  }

addMember(member: Member): Observable<Member>
{
  return this.httpClient.post<Member>(this.memberUrl ,  member);
}

updateMember(values: Member): Observable<Member>
{   
  console.log("service update ", values)
    return this.httpClient.put<Member>( this.memberUrl + values.id, values);         
    
}
deleteMember(id: number) {
//  this.members = this.members.filter(member => member.id !== id)

  return this.httpClient.delete<Member[]>( this.memberUrl + id);
          
}

}
