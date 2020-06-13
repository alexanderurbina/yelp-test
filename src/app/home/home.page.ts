import { Component } from '@angular/core';
import { UsersService } from './../services/users.service';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { CreateUserPage } from './../modals/create-user/create-user.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public user: User[];
  constructor(
    private userService: UsersService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public modalController: ModalController) { }

  ionViewWillEnter() {
    this.user = this.userService.getUsers();
  }

  async loadUsers() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    await this.userService.loadUsers().then(( user: User[]) => {
      this.user = user;
    });
    this.presentToastLoad();
  }

  async saveChanges() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    await this.userService.saveUsers(this.user);
    this.presentToastSave();
  }

  async deleteUser(element) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    this.user.splice(element, 1);
    this.presentToastDelete();
  }

  async presentToastDelete() {
    const toast = await this.toastController.create({
      color: 'dark',
      message: 'User has been deleted.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastSave() {
    const toast = await this.toastController.create({
      color: 'dark',
      message: 'Changes saved.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastLoad() {
    const toast = await this.toastController.create({
      color: 'dark',
      message: 'Loaded users from IndexDB.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'DB empty, please save some data first.',
      duration: 2000
    });
    toast.present();
  }

  async openCreateUser() {
    if (await this.userService.loadUsers() !== false ) {
      const modal = await this.modalController.create({
        component: CreateUserPage
      });
      return await modal.present();
    }
    else {
      this.presentToastError();
    }
  }
}

