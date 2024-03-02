import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Task } from '../modules/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 
apiUrl: string = 'http://localhost:5212/api/Task';
tokenKey: string = "myChallengeToken";

  constructor(private http:HttpClient) { }

  getTaskById(taskId: number): Observable<Task>
  {
    return this.http.get<Task>(`${this.apiUrl}/${taskId}`);
  }

  createTask(newtask:Task): Observable<Task>
  {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
   return this.http.post(this.apiUrl, newtask, {headers: reqHeaders});
  }

  // updateTask(task: Task) : Observable<Task>
  // {
  //   return this.http.put<Task>(`${this.apiUrl}/${task.taskId}`, task);
  // }

//   deleteTask(taskId: number): Observable<Task>
//   {
//  let reqHeaders = {
//   Authorization : `Bearer ${localStorage.getItem(this.tokenKey)}`
//  }
//  return this.http.delete(`${this.apiUrl}/${taskId}`, {headers: reqHeaders});
//   }
 
  getTaskByUserId(userId: string): Observable<any>
  {
    const stringToken = localStorage.getItem('myChallengeToken');
    if (stringToken)
    {
      const tokenJson = JSON.parse(stringToken);
      const headers = new HttpHeaders().set('Authorization',`Bearer ${tokenJson.tokenKey}`);
      return this.http.get<any>(`${this.apiUrl}/user/${userId}`, {
        headers: headers,
      })
      .pipe(map((response) => (response.data ? response.data.task: [])));
    }
    else{
      console.log('invalid token');
      return of([]);
    }

    
    
  }
}
