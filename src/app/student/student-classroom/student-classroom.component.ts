import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Room } from 'src/app/room.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-classroom',
  templateUrl: './student-classroom.component.html',
  styleUrls: ['./student-classroom.component.css']
})
export class StudentClassroomComponent implements OnInit {

  constructor(private authService: AuthService,
    private studService: StudentService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  isLogin = false;
  isLoading = false;
  myRooms: Room[] = []

  info(id: number){
    this.router.navigate(['/student/classrooms/'+id+'/info']);
  }

  ngOnInit(): void {
    this.authService.isLogin.subscribe(
      login => {
        this.isLogin = login;
      }
    );

    if(!this.isLogin){
      alert("Please Login...");
      this.router.navigate(['/auth']);
    }else{
      const user = this.authService.getUser();
      if(user.userType.toLowerCase() != "student"){
        alert("You are Not Authorised");
        this.router.navigate(['../'],{relativeTo: this.route});
      }else{
        this.studService.myRoomsChanged.subscribe(
          rooms => {
            this.myRooms = [...rooms];
          }
        )
      }
    }
  }

}
