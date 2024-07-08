import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, State } from './types';
import { FormControl } from '@angular/forms';
import { CountryService } from './country.service';
import { combineLatestWith, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-exercise4',
  templateUrl: './exercise4.component.html',
  styleUrls: ['./exercise4.component.css']
})
export class Exercise4Component {
  countries$: Observable<Country[]>;
  states$: Observable<State[]>;
  state!: State;
  countryControl = new FormControl<string>('');
  stateControl = new FormControl<string>('');

  constructor(private service: CountryService) {
    this.countries$ = this.countryControl.valueChanges.pipe(
      withLatestFrom(this.service.getCountries()),
      map(([userInput, countries]) =>
        countries.filter((c) => c.description.toLowerCase().indexOf((userInput ?? '').toLowerCase()) !== -1)
      )
    );

    this.states$ = this.stateControl.valueChanges.pipe(
      combineLatestWith(this.countries$),
      switchMap((country) => {
        return this.service.getStatesFor(country[1][0].id);
      }),
      map((states, _) =>
        states.filter((s) => s.description.toLowerCase().indexOf((this.stateControl.value ?? '').toLowerCase()) !== -1)
      )
    );
  }

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
  }

  selectState(state: State) {
    this.stateControl.setValue(state.description);
  }
}
