import { Injectable } from '@angular/core';

export interface IUser{
  id: number,
  name: string,
  position: string,
  departament?: string, //Change later
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersPerRequest: number = 4;

  currentUser: IUser

  fakeDb: IUser[] = [
    {
      id: 0,
      name: 'Kenobi',
      position: 'General'
    },
    {
      id: 1,
      name: 'Grievous',
      position: 'General',
    },
    {
      id: 2,
      name: 'Bluezão',
      position: 'Influencer',
    },
    {
      id: 3,
      name: 'Gabriel',
      position: 'Emperor of the World'
    },
    {
      id: 4,
      name: 'Marcell',
      position: 'Trapper'
    },
    {
      id: 5,
      name: 'Omar',
      position: 'Putin supporter'
    },
    {
      id: 6,
      name: 'Someone',
      position: 'Manager or Menager idk how to spell it'
    },
    {
      id: 7,
      name: 'Tired',
      position: 'Of typing users'
    },
    {
      id: 8,
      name: 'Last One',
      position: 'Last of the array'
    }
  ];

  constructor() {
    this.currentUser = this.getUser(5) // troque o parametro para mudar o usuário
   }

  getUser(id: number): IUser{
    return this.fakeDb.filter((user: IUser) => user.id === id)[0];
  }

  getUsers():IUser[]{
    return this.fakeDb
  }


}