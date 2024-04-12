import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { Country, State } from './types';
import { CountryService } from './country.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.css']
})
export class Exercise2Component implements OnInit {
  countries$: Observable<Country[]> = this.service.getCountries();
  states$: Observable<State[]>;
  countryChange$: Subscription;
  countryDropdown = new FormControl<Country['id']>(null);
  stateDropdown = new FormControl<State['code']>(null);

  constructor(private service: CountryService) {}

  ngOnInit() {
    this.countryChange$ = this.countryDropdown.valueChanges.subscribe((countryId: string) => {
      this.states$ = this.service.getStates(countryId).pipe(tap((states: State[]) => this.sortStates(states)));
    });
  }

  ngOnDestroy() {
    this.countryChange$.unsubscribe();
  }

  sortStates(states: State[]): State[] {
    return states.sort((current, next) => current.description.localeCompare(next.description));
  }
}
