import { ApiService } from '@realworld/core/http-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RosterService {
  constructor(private apiService: ApiService) {}

  getUsersStats(): Observable<UserStatsResponse> {
    return this.apiService.get('/users/stats');
  }
}

export interface UserStats {
  username: string;
  articles_count: number;
  total_likes: string; // This should probably be a number, but based on your example, it's a string.
  first_article_date: string; // This can be further typed as Date if you plan to convert the string to a Date object in your service or component.
}

export type UserStatsResponse = UserStats[];
