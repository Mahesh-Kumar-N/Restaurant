import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {RestaurantService} from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Restaurant-app';

  opened = true;

  sideMenuList = [
    {item: 'Home', icon: 'home'},
    {item: 'Orders', icon: 'description'},
    {item: 'Notifications', icon: 'mark_email_unread'},
    {item: 'Help and Support', icon: 'help'},
  ]

  selectedMenu = 'Home';

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: ['']
    });
    this.form.get('search')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((val) => {
      this.restaurantService.updateSearchObserver(val);
    });
  }
}