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

  rest: any[];
  unSub$ = new Subject();

  constructor(private toastCtrl: ToastController, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getRestaurants();
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

  getRestaurants() {
    this.restaurantService.getRestaurants()
      .pipe(
        takeUntil(this.unSub$)
      )
      .subscribe(value => this.rest = value);
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.complete();
  }

}
