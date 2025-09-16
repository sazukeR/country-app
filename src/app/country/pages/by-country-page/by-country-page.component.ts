import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { catchError, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),

    stream: ({ params }) => {
      if (!params.query) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: params.query,
        },
      });

      return this.countryService.searchByCountry(params.query).pipe(
        catchError((err) => {
          console.log('Error Error', err);

          //to solve an issue with angular v20
          return of([]);
        })
      );
    },
  });

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),

  //   loader: async ({ params }) => {
  //     if (!this.query()) return [];

  //     return await firstValueFrom(this.countryService.searchByCountry(params.query));
  //   },
  // });

  // onSearch(value: string) {
  //   console.log(value);
  // }
}
