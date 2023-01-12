import {Component, Input, OnInit} from '@angular/core';
import {Restaurant, Menu, RestaurantDetail} from '../../models/restaurant';
import {RestaurantService} from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
  @Input() restaurantDetail!: RestaurantDetail;
  @Input() restaurant!: Restaurant;
  itemCategory: string[] = ['All'];
  menuList: Menu[] = [];
  originalMenuList: Menu[] = [];
  selectedCategory = 'All';

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurant?.restaurantCategory.split(",").forEach((category) => {
      const val = category.replace(/[^a-zA-Z]/gi, " ").trim();
      this.itemCategory?.push(val);
    });
    this.restaurantService.getMenuItems().subscribe({
      next: (response: Menu[]) => {
        this.originalMenuList = response;
        this.filterMenuList(this.restaurant?.restaurantName, 'restaurantName');
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  filterMenuList(filterString: string, filterKey: string): void {
    if (filterString === 'All') {
      this.menuList = this.originalMenuList;
      this.selectedCategory = filterString;
    } else {
      let currentMenuList: Menu[] = [];
      this.originalMenuList.forEach((menu: Menu) => {
        if (filterKey === 'category') {
          this.selectedCategory = filterString;
          if (menu.itemCategory.includes(filterString)) {
            currentMenuList.push(menu);
          }
        } else if (filterKey === 'restaurantName') {
          if (menu.restaurantName.includes(filterString)) {
            currentMenuList.push(menu);
          }
        }
      });
      this.menuList = currentMenuList;
    }
  }

}
