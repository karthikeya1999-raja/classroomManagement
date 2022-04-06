import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Room } from '../room.model';
import { getStorage, ref , uploadBytes } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private allClassRooms: Room[] = [];
  myRooms: Room[] = []
  getRoomsChanged = new BehaviorSubject<Room[]>([]);
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
    private authService: AuthService) { }

    initFireBaseStorage(){
      // Create a root reference
      const storage = getStorage();

      // Create a reference to 'mountains.jpg'
      const mountainsRef = ref(storage, 'mountains.jpg');

      // Create a reference to 'images/mountains.jpg'
      const mountainImagesRef = ref(storage, 'images/mountains.jpg');

      // While the file names are the same, the references point to different files
      mountainsRef.name === mountainImagesRef.name;           // true
      mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 
    }

    generateRoomCode(): string{
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (var i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      for(let room of this.allClassRooms){
        if(room.roomCode == result){
          result = this.generateRoomCode();
          break;
        }
      }
      return result;
    }

  createRoom(room: Room){
    const teacher = this.authService.getUser();
    room.classTeacher = teacher;

    this.http.post('https://classroom-management-5cf8b-default-rtdb.firebaseio.com/rooms.json',room).subscribe(
      () => {
        this.myRooms.push(room);
        this.getRoomsChanged.next(this.myRooms);
      },
      (error) => {
        alert(error);
      },
      () => {
        alert("Room Created Successfully...");
      }
    );
  }

  getMyRoomsFromServer(){
    this.isLoading.next(true);
    this.http.get<Room[]>('https://classroom-management-5cf8b-default-rtdb.firebaseio.com/rooms.json').subscribe(
      response => {
        const myRooms: Room[] = []
        const allRooms: Room[] = []
        for(const key in response){
          if(response.hasOwnProperty(key)){
            if(response[key].students == null){
              allRooms.push({...response[key], id: key, students: []});
            }else{
              allRooms.push({...response[key], id: key});
            }
            if(response[key].classTeacher.id == this.authService.getUser().id){
              myRooms.push({...response[key], id: key});
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
        this.getRoomsChanged.next(this.myRooms);
        this.isLoading.next(false);
      }
    );
  }

  getClassroom(id: number){
    return this.myRooms[id];
  }

  postAssignment(data: FormData){
    const storage = getStorage();
    const mountainsRef = ref(storage, 'mountains.jpg');
  }
}
