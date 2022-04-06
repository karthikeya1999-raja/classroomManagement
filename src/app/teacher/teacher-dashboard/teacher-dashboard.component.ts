import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Room } from 'src/app/room.model';
import { User } from 'src/app/user.model';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  constructor(private authService: AuthService,
    private tService: TeacherService,
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
      if(this.user.userType.toLowerCase() != "teacher"){
        alert("You are Not Authorised...")
        this.router.navigate(['../'], {relativeTo: this.route});
      }else{
        this.tService.getRoomsChanged.subscribe(
          rooms => {
            this.myRooms = [...rooms];
          }
        );
      }
    }
  }

}
