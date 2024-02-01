import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../modules/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  databaseUrl: string = "http://localhost:5212/api/users";
  private token : string ='myChallengeToken';
  private _isLoggedIn = new BehaviorSubject(false);
  isLoggedIn = this._isLoggedIn.asObservable();

  constructor(private http:HttpClient) {

    if(localStorage.getItem(this.token))
    {
      this._isLoggedIn.next(true);
    }
   }

   Signup(newUser : User)
   {
    return this.http.post(this.databaseUrl + '/register', newUser);

   }
   login(email : string, password: string)
   {
     let querryParams = new HttpParams();
     querryParams = querryParams.append('email', email);
     querryParams = querryParams.append('password', password);
     return this.http.get (`${this.databaseUrl}/login`, {params: querryParams, responseType: 'text'})
     .pipe(tap((response : any) => {
      if (response){
        this._isLoggedIn.next(true);
      }
      else{
        this._isLoggedIn.next(false);
      }
     }));
   }
   logout(){
    localStorage.removeItem(this.token);
    this._isLoggedIn.next(false);
   }
   getCurrentUser() : Observable <User>
   {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.token)}`
    }
    return this.http.get<User>(`${this.databaseUrl}/current`, {headers : reqHeaders})
   }
}
