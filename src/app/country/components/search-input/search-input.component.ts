import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  inputValue = output<string>();

  placeholderValue = input<string>('Buscar');

  onSearch(value: string) {
    this.inputValue.emit(value);
  }
}
