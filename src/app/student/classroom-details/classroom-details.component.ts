import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Room } from 'src/app/room.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.css']
})
export class ClassroomDetailsComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private stuService: StudentService,
    private route: ActivatedRoute) { }

  isLogin = false;
  id: number = -1;
  room: Room = new Room();

  ngOnInit(): void {
    this.authService.isLogin.subscribe(
      login => {
        this.isLogin = login;
      }
    );

    if(!this.isLogin){
      alert("Please Signin");
      this.router.navigate(['/auth']);
    }else{
      this.route.params.subscribe(
        p => {
          this.id = +p.id;
          this.room = this.stuService.getClassroom(this.id);
        }
      );
    }
  }

}
