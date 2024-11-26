import { Component, Input } from '@angular/core';
import { CountryDetails } from '../../../models/country-info.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-display.component.html',
  styleUrls: ['./country-display.component.css'],
})
export class CountryDisplayComponent {
    @Input() country!: CountryDetails;
}