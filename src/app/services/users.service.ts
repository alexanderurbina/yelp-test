import { Injectable } from '@angular/core';
import { User } from './../interfaces/user';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  user: User[] = [];
  Data: User[] = [
    {
      id: 1,
      name: 'John',
    },
    {
      id: 2,
      name: 'Cliff',
    },
    {
      id: 3,
      name: 'Pete',
    },
    {
      id: 4,
      name: 'George',
    },
  ];
  constructor(private storage: Storage) {}

  getUsers() {
    return this.Data;
  }

  saveUsers(users) {
    this.storage.set('users', users);
  }

  loadUsers(){
    return this.storage.get('users');
  }

  async createUser(data) {
    this.user.push(await this.storage.get('users'));
    console.log(this.user);
    this.user.push(data);
    console.log(this.user);
    this.storage.set('users', this.user);
  }

}
