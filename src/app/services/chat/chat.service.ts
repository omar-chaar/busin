import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMessage, MessagesService } from '../messages/messages.service';
import { IUser } from '../user/user.service';
import { UserService } from '../user/user.service';

export interface IChat{
  id: number,
  participants: IUser[],
  messages?: IMessage[],
  read: boolean,
  lastMessage: Date,
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatsPerRequest: number = 4;
  subscription: Subscription;
  fakeDb: IChat[] = [
    {
      id: 0,
      participants: [
        this.userService.getUser(0),
        this.userService.getUser(1)
      ],
      read: true,
      lastMessage: new Date()
    },
    {
      id: 1,
      participants: [
        this.userService.getUser(5),
        this.userService.getUser(3)
      ],
      read: true,
      lastMessage: new Date()
    },
    {
      id: 2,
      participants: [
        this.userService.getUser(2),
        this.userService.getUser(5)
      ],
      read: true,
      lastMessage: new Date()
    },
    {
      id: 3,
      participants: [
        this.userService.getUser(5),
        this.userService.getUser(4)
      ],
      read: true,
      lastMessage: new Date()
    },
    {
      id: 4,
      participants: [
        this.userService.getUser(5),
        this.userService.getUser(1)
      ],
      read: true,
      lastMessage: new Date()
    },
    {
      id: 5,
      participants: [
        this.userService.getUser(6),
        this.userService.getUser(5)
      ],
      read: true,
      lastMessage: new Date()
    },
  ]

  constructor(private userService: UserService, private messageService: MessagesService) { 
    this.updateMessages()
    this.subscription = messageService.onChange().subscribe(value => {
      const newArr = this.fakeDb.map(chat => {
        if(chat.id === value.chatId)
          chat.messages.push(value)
          chat.lastMessage = new Date()
        return chat
      })

      this.fakeDb = newArr
    })
  }

  getChats(user:IUser, page:number):IChat[]{
    return this.fakeDb.filter((chat: IChat, index: number) => {
      return (user.id === chat.participants[0].id || user.id === chat.participants[1].id) &&
      (this.chatsPerRequest*page >= index && this.chatsPerRequest*page - this.chatsPerRequest < index) // for testing pagination
    })
  }

  getChat(id: number, user: IUser):IChat|boolean{
    const chat = this.fakeDb.filter((chat: IChat) => chat.id === id)[0]
    if(chat.participants.includes(user)) return chat
    else return false
  }

  getChatByMessage(message: IMessage):IChat{
    return this.fakeDb.filter(chat => chat.messages.includes(message))[0]
  }

  updateMessages():void{
    this.fakeDb.forEach((chat: IChat) => {
      const messages: IMessage[] = this.messageService.getMessages(chat)
      if(messages.length > 0)
        chat.messages = messages
    })
  }
}