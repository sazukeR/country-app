import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  query = signal('');

  countryResource = resource({
    // Define a reactive computation.
    // The params value recomputes whenever any read signals change.
    params: () => ({ query: this.query() }),
    // Define an async loader that retrieves data.
    // The resource calls this function every time the `params` value changes.
    loader: async ({ params }) => {
      if (!this.query()) return [];

      return await firstValueFrom(this.countryService.searchByCapital(params.query));
    },
  });

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);

  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (resp) => {
  //       this.isLoading.set(false);
  //       this.countries.set(resp);
  //     },

  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     },
  //   });
  // }
}
