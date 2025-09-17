import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { RegionOptionsComponent } from './region-options/region-options.component';
import { Region } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

// function validateRegion(queryParam: string): Region {
//   queryParam = queryParam.toLowerCase();

//   const validRegion: Record<string, Region> = {
//     africa: 'Africa',
//     americas: 'Americas',
//     asia: 'Asia',
//     europe: 'Europe',
//     oceania: 'Oceania',
//     antarctic: 'Antarctic',
//   };

//   return validRegion[queryParam] ?? 'Americas';
// }

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, RegionOptionsComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  /// router = inject(Router);

  region = signal<Region | null>(null);

  countryResource = rxResource({
    params: () => ({ region: this.region() }),

    stream: ({ params }) => {
      if (!params.region) return of([]);

      // this.router.navigate(['/country/by-region'], {
      //   queryParams: {
      //     region: params.region,
      //   },
      // });

      return this.countryService.searchByRegion(params.region).pipe(
        catchError((err) => {
          console.log('Error Error', err);

          //to solve an issue with angular v20
          return of([]);
        })
      );
    },
  });
}
