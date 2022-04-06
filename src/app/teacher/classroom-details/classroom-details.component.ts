import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Room } from 'src/app/room.model';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.css']
})
export class ClassroomDetailsComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private tService: TeacherService,
    private route: ActivatedRoute) { }

  fileForm = new FormGroup({
    file: new FormControl(''),
    fileSource: new FormControl('')
  });

  isLogin = false;
  id: number = -1;
  room: Room = new Room;
  file = new File(["foo"], "foo.txt", {
    type: "text/plain",
  });
  files: FileList | null = null

  postAssignment(){
    const formData = new FormData();
    console.log(this.file);
    formData.append('file', this.fileForm.get('fileSource')?.value);
    this.tService.postAssignment(formData);
  }

  onChangeFile(event: any){
    this.file = event.target.files[0];
    this.fileForm.patchValue({
      fileSource: this.file
    });
  }

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
          this.room = this.tService.getClassroom(this.id);
        }
      );
    }
  }

}
