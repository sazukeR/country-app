import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';

export class CountryMapper {
  static restCountryToCountry(country: RESTCountry): Country {
    return {
      cca2: country.cca2,
      flag: country.flag,
      flagSvg: country.flags.svg,
      name: country.name.common,
      nameSpa: country.translations['spa'].official ?? country.name.common,
      capital: country.capital.join(','),
      population: country.population,
      region: country.region,
      subRegion: country.subregion,
    };
  }

  static restCountriesToCountries(countries: RESTCountry[]): Country[] {
    return countries.map(this.restCountryToCountry);
  }
}
