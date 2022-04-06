import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Room } from 'src/app/room.model';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-create-classroom',
  templateUrl: './create-classroom.component.html',
  styleUrls: ['./create-classroom.component.css']
})
export class CreateClassroomComponent implements OnInit {

  constructor(private tService: TeacherService,
    private router: Router,
    private authService: AuthService) { }

    isLogin = false;

  roomForm = new FormGroup({
    school: new FormControl(""),
    sub: new FormControl(""),
    maxStudents: new FormControl("")
  });

  onCreateRoom(){
    let code = this.tService.generateRoomCode()
    const room = new Room(code,
      this.roomForm.value.school,
      this.roomForm.value.sub,
      this.roomForm.value.maxStudents
    );

    this.tService.createRoom(room);
    this.roomForm.reset();
    this.router.navigate(['teacher/classrooms']);
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
      }
    }else{
      alert("Please Login...")
      this.router.navigate(['/auth']);
    }
  }

}
