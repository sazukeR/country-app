import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';

export class CountryMapper {
  static restCountryToCountry(country: RESTCountry): Country {
    return {
      cca2: country.cca2,
      flag: country.flag,
      flagSvg: country.flags.svg,
      name: country.name.common,
      capital: country.capital.join(','),
      population: country.population,
    };
  }

  static restCountriesToCountries(countries: RESTCountry[]): Country[] {
    return countries.map(this.restCountryToCountry);
  }
}
