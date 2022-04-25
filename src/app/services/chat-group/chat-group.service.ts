import { Injectable } from '@angular/core';
import { ChatMessage} from 'src/model/classes/ChatMessage';
import { ChatGroup } from 'src/model/classes/ChatGroup';
import { DepartamentService } from '../departament/departament.service';
import { UserService } from '../user/user.service';
import { ChatMessageService } from '../chat-message/chat-message.service';
import { Departament } from 'src/model/classes/Departament';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupService {

  fakeDb: ChatGroup[] = [];

  constructor(private departamentService: DepartamentService, private userService: UserService) { 
    const departaments = this.departamentService.getAllDepartaments()

    departaments.forEach(departament => {
      const chatGroup = new ChatGroup(departament.id, departament, this.userService.getUsersByDepartament(departament),
      false);
      this.fakeDb.push(chatGroup);
    })

  }

  getChatById(id: number):ChatGroup{
    return this.fakeDb.filter(chat => chat.id === id)[0];
  }

  async createGroup(department: Departament):Promise<boolean>{
    const newGroup = new ChatGroup(department.id, department, [], false);
    this.fakeDb.push(newGroup);
    return true
  }

  async deleteGroup(department: Departament):Promise<boolean>{
    this.fakeDb.splice(department.id, 1);
    return true;
  }

}
