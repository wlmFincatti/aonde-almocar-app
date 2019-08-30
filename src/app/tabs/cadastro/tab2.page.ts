import { RestaurantService } from '../../services/restaurant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { messages } from '../../models/messages';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private route: Router,
    private toastController: ToastController
  ) {
    this.formRegister = this.fb.group({
      name: ['']
    });
  }

  public registerRestaurant() {
    console.log(this.formRegister.value);
    if (this.restaurantService.registerRestaurant(this.formRegister.value)) {
      this.route.navigate(['/']);
      this.presentToast(messages.success.type, messages.success.message, messages.success.icon);
    } else {
      this.presentToast(messages.error.type, messages.error.message, messages.error.icon);
    }

    this.formRegister.reset();
  }

  async presentToast(type: string, msg: string, icon: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top',
      color: type,
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline',
          text: '',
          handler: () => toast.dismiss
        }
      ]
    });
    toast.present();
  }

}
