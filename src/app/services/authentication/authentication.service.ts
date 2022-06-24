import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Role } from 'src/app/enum/role';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/api/authenticate`, { email, password },{headers: new HttpHeaders({'Content-Type':  'application/json',})})
          .pipe(map((user:User) => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              this.isAuthenticated.next(true)
              return user;
          }))
          ;
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
  isAuthorized() {
    return !!this.currentUserSubject.asObservable();
}
hasRole(role: Role) {
    let user:any;
    user = this.currentUserSubject.asObservable()
    
    return this.isAuthorized() && user.Role === role;
}
}