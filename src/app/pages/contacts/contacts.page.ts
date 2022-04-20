import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat/chat.service';
import { DepartamentService, IDepartament } from 'src/app/services/departament/departament.service';
import { IUser, UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['./contacts.page.scss']
})
export class ContactsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonAccordionGroup, { static: true }) accordionGroup: IonAccordionGroup;

  departaments: IDepartament[] = []
  user: IUser;

  page: number = 1
  fullyLoaded = false

  constructor(private departamentService: DepartamentService, private userService: UserService,
    private router: Router, private chatService:ChatService) {
      this.user = this.userService.currentUser
  }

  ngOnInit(): void {
    this.loadMoreDepartaments()
  }

  loadData(event):void {
    setTimeout(() => {
      this.loadMoreDepartaments();
      event.target.complete();
    }, 2000);
  }

  loadMoreDepartaments(): void {
    if (!this.fullyLoaded) {
      const arr = this.departamentService.getDepartaments(this.page)
      if (arr.length > 0) {
        this.departaments.push(...arr)
        this.page++
      } else {
        this.fullyLoaded = true
      }
    }
  }

  getUsers(departament: IDepartament):IUser[]{
    return this.userService.getUsersByDepartament(departament)
  }

  redirectTo(url:string):void{
    this.router.navigateByUrl(url)
  }

  redirectToChat(contact:IUser){
    const chatId = this.chatService.verifyChat(contact, this.user)
    this.router.navigateByUrl('/message/' + chatId)
  }

  logAccordionValue() {
    console.log(this.accordionGroup.value);
  }

  closeAccordion() {
    this.accordionGroup.value = undefined;
  }

}
