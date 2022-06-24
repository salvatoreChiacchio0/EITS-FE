import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  allUsers:User[]
  constructor(
    private http:HttpClient
  ) { }
  getUserById(id:number){
    return this.http.get<any>(`${environment.apiUrl}/api/user/${id}`)
  }
  getAllUser(){
    return this.http.post<any>(`${environment.apiUrl}/api/user/filter`,{})

  }
}
