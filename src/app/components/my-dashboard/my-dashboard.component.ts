import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/modules/task';
import { User } from 'src/app/modules/user';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit{

  userId : number | undefined ;
  user : User  | undefined;
  tasks: Task[] = [];

  constructor(private route: ActivatedRoute, private toDoservice : TodoService)
  {  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params ['id'];
      if (this.userId !== undefined)
      {
        this.loadUserData();
        this.loadTasks();
      }
     
    });
  }

  private loadUserData()
  {
    if (this.userId !== undefined)
    {
      this.toDoservice.getCurrentUser(this.userId).subscribe((User) => {
        this.user = User;
      });
    }
   
  }

  private loadTasks()
  {
    if(this.userId !== undefined)
    {
      this.toDoservice.getTasks(this.userId).subscribe((tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks: ', error);
      });
    }
   
  }
}
