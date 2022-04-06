import { User } from "./user.model";

export class Room{
    constructor(
        public roomCode: string = "",
        public school: string = "",
        public subject: string = "",
        public maxStudents: number = 0,
        public classTeacher: User = new User(),
        public students: User[] = [],
        public id: string = ""
    ){}
}