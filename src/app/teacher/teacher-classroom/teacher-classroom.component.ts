import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Room } from 'src/app/room.model';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher-classroom',
  templateUrl: './teacher-classroom.component.html',
  styleUrls: ['./teacher-classroom.component.css']
})
export class TeacherClassroomComponent implements OnInit {

  constructor(private tService: TeacherService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }
    
  myRooms: Room[] = []
  isLoading = false;
  isLogin = false;

  info(id: number){
    this.router.navigate(['/teacher/classrooms/'+id+'/info']);
  }

  ngOnInit(): void {
    this.authService.isLogin.subscribe(
      login => {
       this.isLogin = login;
      }
    );

    if(this.isLogin){
      const user = this.authService.getUser();
      if(user.userType.toLowerCase() != "teacher"){
        alert("You are Not Authorised...")
        this.router.navigate(['/auth']);
      }else{
        this.tService.getRoomsChanged.subscribe(
          rooms => {
            this.myRooms = [...rooms];
          }
        );
    
        this.tService.isLoading.subscribe(
          loading => {
            this.isLoading = loading;
          }
        );
      }
    }else{
      alert("Please Login...")
      this.router.navigate(['/auth']);
    }
  }

}
