import { IUser } from "../interfaces/interfaces";
import { Department } from "./Department";

export class User implements IUser{

    id: number;
    name: string;
    surname: string;
    position: string;
    email: string;
    profilePicture: string;
    department: Department;
    admin: boolean;
    owner: boolean;
    token: string;

    constructor(id:number, name:string, surname:string, position:string,
                email: string, profilePicture:string, department:Department, admin:boolean,
                owner: boolean, token?:string){
            this.id = id;
            this.name = name;
            this.surname = surname;
            this.position = position;
            this.email = email;
            this.profilePicture = profilePicture;
            this.department = department;
            this.admin = admin;
            this.owner = owner;
            this.token = token;
    }

    getFullName(): string {
        return `${this.name} ${this.surname}`;
    }
}