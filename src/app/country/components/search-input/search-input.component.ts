import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  value = output<string>();
  placeholderValue = input<string>('Buscar');

  initialValue = input<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  onSearch(value: string) {
    this.value.emit(value);
  }

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue(); // this line trigger the effect since angular detects a signal inside its body

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
