import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { RosterStoreService } from './page.store'; // Assuming RosterStoreService is in the same directory as PageComponent
import { Store } from '@ngrx/store';
import { provideComponentStore } from '@ngrx/component-store';
import { selectUser } from '@realworld/auth/data-access';
import { filter, take } from 'rxjs';
import { UserStats } from './page.service';

@UntilDestroy()
@Component({
  selector: 'cdt-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [provideComponentStore(RosterStoreService)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit {
  userStats$ = this.rosterStore.userStats$;
  currentUsername: string | undefined; // Explicitly declare the type here

  constructor(private readonly store: Store, private readonly rosterStore: RosterStoreService) {}

  ngOnInit() {
    this.rosterStore.getUsersStats();

    this.store
      .select(selectUser)
      .pipe(filter((user) => !!user))
      .subscribe((user) => {
        this.currentUsername = user.username;
      });
  }
}
