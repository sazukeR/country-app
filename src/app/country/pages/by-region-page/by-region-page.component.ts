import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { RegionOptionsComponent } from './region-options/region-options.component';
import { Region } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, RegionOptionsComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  countryService = inject(CountryService);

  query = signal<Region | null>(null);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),

    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByRegion(params.query).pipe(
        catchError((err) => {
          console.log('Error Error', err);

          //to solve an issue with angular v20
          return of([]);
        })
      );
    },
  });
}
