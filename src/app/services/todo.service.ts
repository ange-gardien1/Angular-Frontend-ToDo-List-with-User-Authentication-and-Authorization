import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../modules/user';
import { Task } from '../modules/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 
  constructor(private http:HttpClient) { }



}
