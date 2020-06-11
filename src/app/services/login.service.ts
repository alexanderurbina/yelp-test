import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private storage: Storage) {
   }

   checkLog(){
     if (!this.storage.get('log')){
      this.storage.set('log', true);
     }
     else {
       return true;
     }
   }
}
