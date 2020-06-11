import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { User } from './../../interfaces/user';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  user: User = {
    id: 0 ,
    name: ''
  };
  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  createUser(){
    this.usersService.createUser(this.user);
  }
}
