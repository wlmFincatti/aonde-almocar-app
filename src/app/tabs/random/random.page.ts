import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { Observable, pipe, Subject, from } from 'rxjs';
import { debounceTime, debounce, take, takeUntil } from 'rxjs/operators';
import { messages } from '../../models/messages';

@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
})
export class RandomPage implements OnInit, OnDestroy {

  restaurant: Restaurant[];
  unSub$ = new Subject();
  valid = 0;
  restaurantChoiced: string;


  constructor(private toastCtrl: ToastController, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getRestaurants();
  }

  randomPlace() {
    try {
      const randomNumber = Math.floor(Math.random() * this.restaurant.length);
      this.restaurantChoiced = this.restaurant[randomNumber].name;
    } catch (e) {
      this.presentToast(messages.random.error.type, messages.random.error.message);
    }
  }

  async presentToast(type: string, msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'top',
      color: type
    });

    toast.present();
  }

  getRestaurants() {
    this.restaurantService.getRestaurants()
      .pipe(
        takeUntil(this.unSub$)
      )
      .subscribe(value => {
        this.restaurant = value;
        this.valid = value.length;
      });
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.complete();
  }

}
