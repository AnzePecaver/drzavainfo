import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CountriesInfo, CountryDetails, CountryInfo } from "../models/country-info.model";

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    constructor (private http: HttpClient) {

    }

    getCountries(): Observable<CountriesInfo> {
        return this.http.get<CountriesInfo>('/naloga/api/task/countries');
    }

    postCountry(country: CountryInfo): Observable<CountryDetails> {
        return this.http.post<CountryDetails>('/naloga/api/task/countries', country);
    }
    
}