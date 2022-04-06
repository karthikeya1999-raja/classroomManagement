import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { JoinRoom } from '../joinroom.model';
import { Room } from '../room.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private allClassRooms: Room[] = [];
  myRooms: Room[] = [];
  myRoomsChanged = new BehaviorSubject<Room[]>([]);
  isLoading = new BehaviorSubject<boolean>(false);

  getAllClassRooms(){
    this.isLoading.next(true);
    this.http.get<Room[]>('https://classroom-management-5cf8b-default-rtdb.firebaseio.com/rooms.json').subscribe(
      response => {
        const myRooms: Room[] = []
        const allRooms: Room[] = []
        for(const key in response){
          if(response.hasOwnProperty(key)){
            if(response[key].students != null){
              for(const stud of response[key].students){
                if(stud.id == this.authService.getUser().id){
                  myRooms.push({...response[key], id: key});
                }
              }
              allRooms.push({...response[key], id: key});
            }else{
              allRooms.push({...response[key], id: key, students: []});
            }
          }
        }
        this.allClassRooms = [...allRooms];
        this.myRooms = [...myRooms];
      },
      (error) => {
        alert(error);
      },
      () => {
        this.myRoomsChanged.next(this.myRooms);
        this.isLoading.next(false);
      }
    );
  }

  joinClassRoom(room: JoinRoom){
    const student = this.authService.getUser();
    room.student = student;
    let studentFoundInClasroom = false;
    let roomFound = false;
    let toJoinRoom = new Room();

    for(const myRoom of this.allClassRooms){
      if(room.roomCode == myRoom.roomCode &&
        room.school == myRoom.school &&
        room.subject == myRoom.subject){
          roomFound = true;
          toJoinRoom = new Room(myRoom.roomCode,myRoom.school
                          ,myRoom.subject,myRoom.maxStudents,myRoom.classTeacher,
                          myRoom.students,myRoom.id);

          for(const stud of myRoom.students){
            if(stud.id == room.student.id){
              studentFoundInClasroom = true;
              break;
            }
          }
        break;
      }
    }

    if(roomFound && !studentFoundInClasroom){
      toJoinRoom.students.push(room.student);
      this.http.put('https://classroom-management-5cf8b-default-rtdb.firebaseio.com/rooms/'+toJoinRoom.id+'.json',toJoinRoom)
      .subscribe(
        () => {
          this.myRooms.push(toJoinRoom);
          this.myRoomsChanged.next(this.myRooms);
        },
        (error) => {
          alert(error)
        },
        () => {
            alert("Joined the class");
        }
      );
    }else if(roomFound && studentFoundInClasroom){
      alert("Already Joined...")
    }else{
      alert("Room not found with provided details...")
    }
  }

  getClassroom(id: number){
    return this.myRooms[id];
  }
}
