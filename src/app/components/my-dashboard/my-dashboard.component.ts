import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
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

  isloggedIn: boolean = false;
  currentuser : any = {};
  tasks: Task[] = [];
  newTaskName: string = '';


  constructor(private route: ActivatedRoute, private toDoservice : TodoService, private userService : UserService)
  {  }
  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((loggedIn) => {
      this.isloggedIn = loggedIn;
      if (loggedIn) {
        const jwtstring = localStorage.getItem('myChallengeToken');
        console.log('Token:', jwtstring);
  
        if (jwtstring !== null) {
          try {
            const decodedToken: any = jwtDecode(jwtstring);
            console.log('Decoded Token:', decodedToken);
  
            if (decodedToken && decodedToken.unique_name) {
              console.log('User Name:', decodedToken.unique_name);
              this.currentuser = { name: decodedToken.unique_name };
            } else {
              console.error('Invalid JWT structure:', decodedToken);
            }
          } catch (error) {
            console.error('Error decoding JWT:', error);
          }
        } else {
          this.currentuser = null;
        }
      }
    });
  }
  
  
  createTask() {
    // if (this.userId !== undefined && this.newTaskName.trim() !== '') {
      // this.toDoservice.createTask(this.userId, this.newTaskName).subscribe(
  //       (createdTask) => {
  //         this.tasks.push(createdTask);
  //         this.newTaskName = ''; // Clear the input field after creating a task
  //       },
  //       (error) => {
  //         console.error('Error creating task:', error);
  //       }
  //     );
  //   }
  }
}

