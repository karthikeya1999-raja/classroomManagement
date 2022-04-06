import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = new BehaviorSubject<boolean>(false);
  type = new BehaviorSubject<string>("");
  private user: User = new User();
  private users: User[] = [];

  constructor(private http: HttpClient) { }

  login(email: string, password: string, type: string){
    let userFound = false;

    this.http.get<User[]>('https://classroom-management-5cf8b-default-rtdb.firebaseio.com/users.json').subscribe(
     response => {
      const userArray: User[] = [];
      for(const key in response){
        if(response.hasOwnProperty(key)){
          userArray.push({...response[key], id: key});
        }
      }
      this.users = [...userArray];
     },
     (error) => {
       alert(error);
     },
     () => {
      for(const user of this.users){
        if(user.email == email &&
          user.password == password &&
          user.userType == type){
            userFound = true;
            this.user = user;
            break;
          }
      }

      if(userFound){
        this.isLogin.next(true);
        this.type.next(type);
        alert("Login successfull....");
      }else{
        alert("Login failed..... check the login details and try again");
      }
     }
    );
  }

  signUp(user: User){
    this.http.post<User>('https://classroom-management-5cf8b-default-rtdb.firebaseio.com/users.json',user).subscribe(
      () => {
        alert("Hello "+ user.fname + " "+ user.lname + " signup successfull...");
      }
    );
  }

  logout(){
    this.isLogin.next(false);
  }

  getUser(){
    return this.user;
  }
}
