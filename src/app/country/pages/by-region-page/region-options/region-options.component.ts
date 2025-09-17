import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { Region } from '../../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';

function validateRegion(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegion: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegion[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-region-options',
  imports: [],
  templateUrl: './region-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionOptionsComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  regionOptions = input<Region[]>([]);

  selectedRegion = output<Region>();

  currentActiveRegion = linkedSignal<Region>(() => validateRegion(this.queryParam));

  debounceEffect = effect((onCleanup) => {
    const value = this.currentActiveRegion(); // this line trigger the effect since angular detects a signal inside its body

    // const timeout = setTimeout(() => {
    //   this.value.emit(value);
    // }, 500);

    // onCleanup(() => {
    //   clearTimeout(timeout);
    // });
    console.log(value);
    this.selectedRegion.emit(value);
    this.router.navigate(['/country/by-region'], {
      queryParams: {
        region: value,
      },
    });
  });

  onRegionSelected(region: Region) {
    this.currentActiveRegion.set(region);
  }
}
