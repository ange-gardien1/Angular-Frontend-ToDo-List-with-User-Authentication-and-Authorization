import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  newUser : User = new User({});
  errorMessage: string = '';
  constructor(private userservice: UserService, private router : Router){}

  ngOnInit(): void {

  }

  signup()
  
  {
    this.userservice.Signup(this.newUser).subscribe(() => {
      this.router.navigate(['login']);
    },
    
    (error) => {
   
      this.errorMessage = error.error?.message;
      console.error('Error:', error);

    }
    )
  }
}
