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

  restaurants: Observable<Restaurant[]>;
  rest: any[];

  constructor(private toastCtrl: ToastController, private restaurantService: RestaurantService) {
    this.restaurants = this.restaurantService.getRestaurants()
      .pipe(
        debounceTime(1000),
      );
  }

  ngOnInit() {
  }

  randomPlace() {
    this.restaurantService.getRestaurants()
      .pipe(
        debounceTime(100),
        take(1)
      )
      .subscribe(value => this.rest = value);

    const randomNumber = Math.floor(Math.random() * this.rest.length);

    this.presentToast(this.rest[randomNumber].name);
    console.log(this.rest[randomNumber].name)
  }

  async presentToast(restaurantChoiced) {
    const toast = await this.toastCtrl.create({
      message: `Restaurante <b>${restaurantChoiced}</b>`,
      duration: 3000,
      position: "top"
    });

    toast.present();
  }

}
