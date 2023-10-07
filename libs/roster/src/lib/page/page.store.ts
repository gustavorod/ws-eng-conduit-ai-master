import { Injectable } from '@angular/core';
import { ComponentStore, OnStateInit, tapResponse } from '@ngrx/component-store';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RosterService, UserStats } from './page.service';

export interface RosterState {
  userStats: UserStats[];
}

@Injectable()
export class RosterStoreService extends ComponentStore<RosterState> implements OnStateInit {
  constructor(private readonly rosterService: RosterService) {
    super({ userStats: [] });
  }

  ngrxOnStateInit() {
    this.getUsersStats();
  }

  // SELECTORS
  userStats$ = this.select((store) => store.userStats);

  // EFFECTS
  readonly getUsersStats = this.effect<void>(
    pipe(
      switchMap(() =>
        this.rosterService.getUsersStats().pipe(
          tapResponse(
            (response) => {
              this.patchState({ userStats: response });
            },
            (error) => {
              console.error('error getting user stats: ', error);
            },
          ),
        ),
      ),
    ),
  );
}
