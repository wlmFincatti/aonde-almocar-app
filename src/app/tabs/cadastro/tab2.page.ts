import { RestaurantService } from '../../services/restaurant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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
      this.presentToast();
    }

    this.formRegister.reset();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Restaurante cadastrado com sucesso!',
      duration: 1500,
      position: 'middle',
      color: 'success',
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
