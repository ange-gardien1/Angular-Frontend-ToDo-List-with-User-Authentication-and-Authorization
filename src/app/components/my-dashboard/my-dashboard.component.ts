import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/modules/task';
import { User } from 'src/app/modules/user';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit{

  userId : number | undefined ;
  curentuser : User  | undefined;
  tasks: Task[] = [];
  newTaskName: string = '';

  constructor(private route: ActivatedRoute, private toDoservice : TodoService, private userService : UserService)
  {  }

  ngOnInit(): void {
   this.userService.getCurrentUser().subscribe((user : User) => {
    this.curentuser = user
   })
  }

  

 


  createTask() {
    if (this.userId !== undefined && this.newTaskName.trim() !== '') {
      this.toDoservice.createTask(this.userId, this.newTaskName).subscribe(
        (createdTask) => {
          this.tasks.push(createdTask);
          this.newTaskName = ''; // Clear the input field after creating a task
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }
}

