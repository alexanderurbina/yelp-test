import { Component } from '@angular/core';
import { UsersService } from './../../services/users.service';
import { User } from './../../interfaces/user';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage {
  public user: User = {
    id: null,
    name: null
  };
  constructor(
    private usersService: UsersService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public modalController: ModalController) { }

  public async createUser() {
    if (!(this.user.id != null && this.user.name != null)) {
      this.presentToasError();
    }
    else {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        duration: 2000
      });
      await loading.present();
      const { role, data } = await loading.onDidDismiss();
      await this.usersService.createUser(this.user);
      this.presentToastCreated();
      this.modalController.dismiss();
    }
  }

  public async presentToastCreated() {
    const toast = await this.toastController.create({
      color: 'dark',
      message: 'User has been created.',
      duration: 2000
    });
    toast.present();
  }

  public async presentToasError() {
    const toast = await this.toastController.create({
      color: 'danger',
      message: 'Form Error, you must fill the fields.',
      duration: 2000
    });
    toast.present();
  }

  public close() {
    this.modalController.dismiss();
  }
}
