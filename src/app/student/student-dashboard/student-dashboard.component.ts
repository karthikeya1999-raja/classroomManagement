import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Room } from 'src/app/room.model';
import { User } from 'src/app/user.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private authService: AuthService,
    private stuService: StudentService,
    private router: Router,
    private route: ActivatedRoute) { }

    user: User = new User();
    myRooms : Room[] = []
    isLogin = false;

  ngOnInit(): void {

    this.authService.isLogin.subscribe(
      login => {
        this.isLogin = login;
      }
    );

    if(!this.isLogin){
      alert("Please Login...")
      this.router.navigate(['/auth']);
    }else{
      this.user = this.authService.getUser();
      if(this.user.userType.toLowerCase() != "student"){
        alert("You are Not Authorised...")
        this.router.navigate(['../'], {relativeTo: this.route});
      }else{
        this.stuService.myRoomsChanged.subscribe(
          rooms => {
            this.myRooms = [...rooms];
          }
        );
      }
    }
  }
}
