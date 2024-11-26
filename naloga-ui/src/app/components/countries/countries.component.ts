import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryDetails, CountryInfo } from '../../models/country-info.model';
import { CountryService } from '../../services/country.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { CountryDisplayComponent } from './country-display/country-display.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent, CountryDisplayComponent],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countries: CountryInfo[] | null = null;
  sortedCountries: CountryInfo[] = [];
  error: string | null = null
  selectedCountry: CountryDetails | null = null;
  selectedCountryId: number | null = null;

  currentSortColumn: keyof CountryInfo | null = null;
  isAscending: boolean = true;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data.countries;
        this.sortedCountries = data.countries;
      },
      error: (error) => {
        const errorMessage = 'Napaka pri pridobivanju seznama držav.'
        this.error = errorMessage
        console.error(errorMessage, error);
      },
    });
  }

  selectCountry(country: CountryInfo) {
    this.selectedCountryId = country.id;
    this.selectedCountry = null;
    this.countryService.postCountry(country).subscribe({
        next: (data) => {
            this.selectedCountry = data
            console.log(data)
        },
        error: (error) => {
            const errorMessage = 'Napaka pri oddaji izbrane države.'
            this.error = errorMessage
            console.error(errorMessage, error);
        }
    })
  }

  sortBy(column: keyof CountryInfo): void {
    if (this.currentSortColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.currentSortColumn = column;
      this.isAscending = true;
    }

    this.sortedCountries.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
      }
      if (typeof valueB === 'string') {
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return this.isAscending ? -1 : 1;
      } else if (valueA > valueB) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}