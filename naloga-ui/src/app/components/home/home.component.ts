import { Component } from '@angular/core';
import { IpDisplayComponent } from '../ip-display/ip-display.component';
import { CountriesComponent } from '../countries/countries.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IpDisplayComponent, CountriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
