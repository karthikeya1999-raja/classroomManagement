import { User } from "./user.model";

export class JoinRoom{
    constructor(
        public roomCode: string = "",
        public school: string = "",
        public subject: string = "",
        public student: User = new User()
    ){}
}