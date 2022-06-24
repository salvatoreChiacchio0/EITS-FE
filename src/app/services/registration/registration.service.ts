import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(email:any,nome:any,password:any,role:any,cognome:any){
    return this.http.post<any>(`${environment.apiUrl}/api/register/user`, { email,nome,cognome, role,password})
          .pipe(map((response:any) => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              
              return response;
          }));
  }
}
