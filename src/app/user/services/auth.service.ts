import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient) { }

  loginUser(userName: string, password: string): Observable<any> {
    const loginInfo = { username: userName, password: password };
    const options = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

    return this.http.post("/api/login", loginInfo, options)
      .pipe(tap(data => this.currentUser = <IUser>data["user"]))
      .pipe(catchError(error => { return of(false) }));
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  checkAutheticationStatus() {
    this.http.get("/api/currentIdentity")
      .pipe(tap(data => {
        if (data instanceof Object) {
          this.currentUser = <IUser>data;
        }
      }))
      .subscribe();
  }

  updateProfile(firstName: string, lastName: string): Observable<IUser> {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const options = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
    return this.http.put<IUser>(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  logout(): Observable<any> {
    this.currentUser = undefined;
    const options = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
    return this.http.post("/api/logout", {}, options);
  }
}
