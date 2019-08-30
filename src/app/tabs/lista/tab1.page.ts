import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { Component } from '@angular/core';
import { Observable, pipe, Subject, empty, throwError, of } from 'rxjs';
import { tap, map, take, catchError } from 'rxjs/internal/operators';
import { debounceTime, debounce } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  titleTab = 'Restaurantes';
  restaurants$: Observable<Restaurant[]>;
  rest: any[];
  error$ = new Subject<boolean>();
  searchText: string;

  constructor(
    private restaurantService: RestaurantService,
    public alertController: AlertController
  ) {
    this.restaurants$ = this.restaurantService.getRestaurants()
      .pipe(
        catchError((error) => {
          console.error('error loading the list of users', error);
          this.error$.next(true);
          return of(null);
        })
      );
  }

  removeRestaurant(valor) {
    this.restaurantService.removeRestaurant(valor);
  }

}
