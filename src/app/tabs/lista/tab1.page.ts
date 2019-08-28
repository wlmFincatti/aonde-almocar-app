import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { Component } from '@angular/core';
import { Observable, pipe, Subject } from 'rxjs';
import { tap, map, take } from 'rxjs/internal/operators';
import { debounceTime, debounce } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  titleTab = 'Restaurantes';
  restaurants: Observable<Restaurant[]>;
  rest: any[];
  error$ = new Subject<boolean>();
  searchText: string;

  constructor(
    private restaurantService: RestaurantService,
    public alertController: AlertController
  ) {
    this.restaurants = this.restaurantService.getRestaurants()
      .pipe(
        debounceTime(1000),
      );
  }

  onClick() {

    this.restaurantService.getRestaurants()
      .pipe(
        debounceTime(300),
        take(1)
      )
      .subscribe(value => this.rest = value);

    let randomNumber = Math.floor(Math.random() * this.rest.length);

    this.presentAlert(this.rest[randomNumber].name);
  }

  private async presentAlert(restaurantChoiced) {
    const alert = await this.alertController.create({
      header: 'Cadastro',
      message: `Restaurante <b>${restaurantChoiced}</b> foi o escolhido!`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

}
