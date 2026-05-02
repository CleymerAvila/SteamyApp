import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Deal } from 'src/app/core/models';
import { FavoriteService } from 'src/app/shared/services/favorite-service';

@Component({
  selector: 'app-favorite',
  templateUrl: 'favorite.page.html',
  styleUrls: ['favorite.page.scss'],
  standalone: false,
})
export class FavoritePage implements OnInit {
  gameDeal$!: Observable<Deal | null>;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.gameDeal$ = this.favoriteService.favoriteDeal$;
    // this.subscribeToChanges();
  }

  subscribeToChanges() {
  }



}
