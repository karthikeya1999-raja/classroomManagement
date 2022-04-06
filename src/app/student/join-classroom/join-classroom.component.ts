import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { JoinRoom } from 'src/app/joinroom.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-join-classroom',
  templateUrl: './join-classroom.component.html',
  styleUrls: ['./join-classroom.component.css']
})
export class JoinClassroomComponent implements OnInit {

  constructor(private stuService: StudentService,
    private router: Router,
    private authService: AuthService) { }

  isLogin = false;

  roomForm = new FormGroup({
    roomCode: new FormControl(""),
    school: new FormControl(""),
    sub: new FormControl("")
  });

  onJoinRoom(){
    const room = new JoinRoom(
      this.roomForm.value.roomCode,
      this.roomForm.value.school,
      this.roomForm.value.sub
    );

    this.stuService.joinClassRoom(room);
    this.roomForm.reset();
    this.router.navigate(['/student/classrooms']);
  }

  ngOnInit(): void {
    this.authService.isLogin.subscribe(
      login => {
        this.isLogin = login;
      }
    );

    if(!this.isLogin){
      alert("Please Login..")
      this.router.navigate(['/auth']);
    }
  }

}
