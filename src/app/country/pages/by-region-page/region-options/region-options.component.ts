import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Region } from '../../../interfaces/country.interface';

@Component({
  selector: 'app-region-options',
  imports: [],
  templateUrl: './region-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionOptionsComponent {
  regionOptions = input<Region[]>([]);

  selectedRegion = output<Region | null>();

  currentActiveRegion = signal<Region | null>(null);

  onRegionSelected(region: Region) {
    this.currentActiveRegion.set(region);
    this.selectedRegion.emit(region);
  }
}
