import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'challengeTod_Frontend';
  currentUser : any;
  isLoggedIn: boolean = false;
  isMenuOpen = false;
  names? = '';

  constructor(private userService: UserService, private router: Router){}
  //  toggleMenu()
  //  {
  //   const token = localStorage.getItem('currentuser');
  //   if(token)
  //   {
  //     this.isloggedIn = true;
  //   }
  //   this.isMenuOpen = !this.isMenuOpen;
  //  }
  ngOnInit(): void {
  //   this.userService.isLoggedIn.subscribe(loggedIn => {
  //     this.isLoggedIn = loggedIn;
  //     if (loggedIn) {
  //         this.userService.getCurrentUser().subscribe(user => {
  //             this.names = user.names;
  //         });
  //     }
  // });
  }
}
