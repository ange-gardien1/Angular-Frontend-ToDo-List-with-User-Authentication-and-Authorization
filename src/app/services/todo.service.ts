import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../modules/user';
import { Task } from '../modules/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 
apiUrl: string = 'http://localhost:5212/api/Task';
tokenKey: string = "myChallengeToken";

  constructor(private http:HttpClient) { }

  getAllTaks(): Observable<Task[]>
  {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }
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

  updateTask(task: Task) : Observable<Task>
  {
    return this.http.put<Task>(`${this.apiUrl}/${task.taskId}`, task);
  }

  deleteTask(taskId: number): Observable<Task>
  {
 let reqHeaders = {
  Authorization : `Bearer ${localStorage.getItem(this.tokenKey)}`
 }
 return this.http.delete(`${this.apiUrl}/${taskId}`, {headers: reqHeaders});
  }
 
  getTaskByUserId(userId: number): Observable<Task[]>
  {
    return this.http.get<Task[]>(`${this.apiUrl}/user/${userId}`);
  }
}
