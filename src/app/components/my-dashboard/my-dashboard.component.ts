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
  isloggedIn: boolean = false;
  constructor(private route: ActivatedRoute, private toDoservice : TodoService, private userService : UserService)
  {  }

  ngOnInit(): void {
    
    this.userService.isLoggedIn.subscribe((loggedIn) => {
      this.isloggedIn = loggedIn;
      if (loggedIn) {
        
        const jwtString = localStorage.getItem('myChallengeToken');
        this.userService.getCurrentUser().subscribe((user) => {
          this.curentuser = user;
        }, 
        (error) => {
          console.error('Error retrieving user data', error);
        })
      
      }
    });
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

