import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit{

  isLogin = false;
  type = "";

  constructor(private router : Router,private authService : AuthService) { }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }


  ngOnInit(): void {
    this.authService.isLogin.subscribe(
      user => {
        this.isLogin = !!user;
      }
    );

    this.authService.type.subscribe(
      type => {
        this.type = type;
      }
    );
  }

}
