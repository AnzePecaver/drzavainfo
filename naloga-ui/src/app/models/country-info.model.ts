export interface CountriesInfo {
    countries: CountryInfo[]
}

export interface CountryInfo {
    id: number;
    alpha2: string;
    alpha3: string;
    name: string;
}

export interface CountryDetails {
    name: CountryDetails.Name;
    capital: string[];
    region: string;
    area: number;
    population: number;
    languages: Record<string, string>;
    currencies: Record<string, CountryDetails.Currency>;
    flags: { 
        png: String 
    };
}

namespace CountryDetails {
    export interface Name {
        common: string;
        official: string;
    }

    export interface Currency {
        name: string;
        symbol: string;
    }
}