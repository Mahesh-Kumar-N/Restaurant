import {Component, OnDestroy, OnInit} from '@angular/core';
import {Restaurant, RestaurantDetail} from '../../models/restaurant';
import {RestaurantService} from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit, OnDestroy {
  restaurantLists!: Restaurant[];
  restaurantDetail!: RestaurantDetail;
  selectedRestaurant!: Restaurant;
  categories: string[] = [];
  originalRestaurantList!: Restaurant[];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.getAllRestaurantInfo();
    this.subscribeToObservable();
  }

  subscribeToObservable(): void {
    this.restaurantService.getSearchObserver().subscribe((val) => {
      this.filterRestaurantListBasedOnSearch(val);
    });
  }

  filterRestaurantListBasedOnSearch(searchValue: string): void {
    const filteredList: Restaurant[] = [];
    this.originalRestaurantList?.forEach((restaurant) => {
      if (restaurant.restaurantName.toLowerCase().includes(searchValue.toLowerCase())) {
        filteredList.push(restaurant);
      }
    });
    this.restaurantLists = filteredList;
  }

  getAllRestaurantInfo(): void {
    this.restaurantService.getAllRestaurantDetails().subscribe({
      next: (response: Restaurant[]) => {
        this.restaurantLists = response;
        this.originalRestaurantList = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onRestaurantSelect(restaurant: Restaurant): void {
    this.selectedRestaurant = restaurant;
    this.restaurantService.getRestaurantDetails(restaurant.id).subscribe({
      next: (response) => {
        this.restaurantDetail = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {

  }
}
