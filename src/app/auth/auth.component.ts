import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private aService: AuthService,
    private router: Router) { }

  isLoginMode = true;
  userType = "";

  signinForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    user: new FormControl("")
  });

  signupForm = new FormGroup({
    fname: new FormControl(""),
    lname: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    school: new FormControl(""),
    phone: new FormControl(""),
    altPhone: new FormControl(""),
    user: new FormControl("")
  });

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSignup(){
    let user = new User(
      this.signupForm.value.fname,
      this.signupForm.value.lname,
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.school,
      this.signupForm.value.user,
      this.signupForm.value.phone,
      this.signupForm.value.altPhone 
    );

    this.aService.signUp(user);
    this.signupForm.reset();
    this.onSwitchMode()
  }

  onSignin(){
    this.userType = this.signinForm.value.user;
    this.aService.login(
      this.signinForm.value.email,
      this.signinForm.value.password,
      this.signinForm.value.user
    );
    
    this.aService.isLogin.subscribe(
      login => {
        if(login){
          this.router.navigate(['/'+this.userType.toLowerCase()])
        }
        this.signinForm.reset();
      }
    )
  }

  ngOnInit(): void {
  }

}
