import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../modules/user';
import { Task } from '../modules/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  databaseUrl: string = "http://localhost:5212/api/Task";
  apiUrl: string = "http://localhost:5212/api/users";
  constructor(private http:HttpClient) { }
  getCurrentUser(userId: number):Observable<User>
  {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);

  }

  getTasks(userId:number): Observable<Task[]>
  {
   return this.http.get<Task[]>(`${this.databaseUrl}/${userId}`)
  }

  createTask(userId: number, taskName: string): Observable<Task> {
    const taskData = { userId, taskName, completed: false };

    return this.http.post<Task>(`${this.databaseUrl}/tasks`, taskData);
  }

}
