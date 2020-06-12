import { Injectable } from '@angular/core';
import { User } from './../interfaces/user';
import { Storage } from '@ionic/storage';
import { Resolver } from 'dns';
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
  constructor(private storage: Storage) { }

  getUsers() {
    return this.Data;
  }

  saveUsers(users) {
    this.storage.set('users', users);
  }

  loadUsers() {
    return new Promise(resolve => {
      this.storage.get('users').then((data) => {
        if (data) {
          resolve(data);
        }
      }).catch((e) => {
        resolve(e);
      });
    });
  }

  async createUser(data) {
    this.user = await this.storage.get('users');
    this.user.push(data);
    this.storage.set('users', this.user);
  }

}
