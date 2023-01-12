import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable, Subject} from 'rxjs';
import {Restaurant, RestaurantRootObject, RestaurantDetail, Menu} from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private readonly hostUrl = 'https://api.sheety.co/bdcbafbc1f4197dda178b9e69f6ccee9/techAlchemyWebTest1';

  private readonly searchObserver = new Subject<string>();

  constructor(private http: HttpClient) {}


  updateSearchObserver(val: string): void {
    this.searchObserver.next(val);
  }

  getSearchObserver(): Observable<string> {
    return this.searchObserver.asObservable();
  }

  getRestaurantDetails(id: number): Observable<RestaurantDetail> {
    return this.http.get<{restaurantDetail: RestaurantDetail}>(`${this.hostUrl}/restaurantDetails/${id}`)
      .pipe(map((res) => {return res.restaurantDetail}));
  }

  getAllRestaurantDetails(): Observable<Restaurant[]> {
    return this.http.get<{allRestaurants: Restaurant[]}>(`${this.hostUrl}/allRestaurants`)
      .pipe(map((res) => {return res.allRestaurants}));

  }

  getMenuItems(): Observable<Menu[]> {
    return this.http.get<{menu: Menu[]}>(`${this.hostUrl}/menu`)
      .pipe(map((res) => {return res.menu}));;
  }

}
