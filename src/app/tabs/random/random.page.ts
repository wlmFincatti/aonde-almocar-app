import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { Observable, pipe, Subject } from 'rxjs';
import { debounceTime, debounce, take } from 'rxjs/operators';



@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
})
export class RandomPage implements OnInit {

  rest: any[];

  constructor(private toastCtrl: ToastController, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.getRestaurants()
    .pipe(
      take(1)
    )
    .subscribe(value => this.rest = value);
  }

  randomPlace() {
    const randomNumber = Math.floor(Math.random() * this.rest.length);

    this.presentToast(this.rest[randomNumber].name);
    console.log(this.rest[randomNumber].name);
  }

  async presentToast(restaurantChoiced) {
    const toast = await this.toastCtrl.create({
      message: `Restaurante <b>${restaurantChoiced}</b>`,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

}
