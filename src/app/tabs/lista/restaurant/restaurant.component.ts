import { RestaurantService } from '../../../services/restaurant.service';
import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor(
    private restaurantService: RestaurantService
  ) {

  }

  ngOnInit() {
  }

  removeRestaurant(valor) {
    this.restaurantService.removeRestaurant(valor);
  }

}
