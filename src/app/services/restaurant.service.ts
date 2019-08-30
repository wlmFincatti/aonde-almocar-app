import { Restaurant } from 'src/app/models/restaurant';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  itemsRef: AngularFireList<Restaurant>;
  items: Observable<Restaurant[]>;

  constructor(
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.itemsRef = this.angularFireDatabase.list(environment.dataRestaurant);
    this.items = this.itemsRef.snapshotChanges(['child_added', 'child_removed'])
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  public registerRestaurant(restaurant: Restaurant) {
    let ret = true;
    this.itemsRef
      .push(restaurant)
      .then(key => console.log(key))
      .catch(err => {
        console.error(err),
          ret = false;
      });
    return ret;
  }

  public getRestaurants() {
    return this.items;
  }

  public removeRestaurant(key: string) {
    this.itemsRef
      .remove(key).then(data => console.log(data))
      .catch(
        err => console.error(err)
      );
  }

}
