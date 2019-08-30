import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { Observable, pipe, Subject } from 'rxjs';
import { debounceTime, debounce, take, takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
})
export class RandomPage implements OnInit, OnDestroy {

  restaurant: Restaurant[];
  unSub$ = new Subject();

  constructor(private toastCtrl: ToastController, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getRestaurants();
  }

  randomPlace() {
    const randomNumber = Math.floor(Math.random() * this.restaurant.length);

    this.presentToast(this.restaurant[randomNumber].name);
    console.log(this.restaurant[randomNumber].name);
  }

  async presentToast(restaurantChoiced: string) {
    const toast = await this.toastCtrl.create({
      message: `Restaurante <b>${restaurantChoiced}</b>`,
      duration: 1500,
      position: 'top',
    });

    toast.present();
  }

  getRestaurants() {
    this.restaurantService.getRestaurants()
      .pipe(
        takeUntil(this.unSub$)
      )
      .subscribe(value => this.restaurant = value);
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.complete();
  }

}
