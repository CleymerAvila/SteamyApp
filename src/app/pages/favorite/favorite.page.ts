import { GameProvider } from 'src/app/shared/services/game-provider';
import { from, Observable, of, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Deal, Game } from 'src/app/core/models';
import { FavoriteService } from 'src/app/shared/services/favorite-service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-favorite',
  templateUrl: 'favorite.page.html',
  styleUrls: ['favorite.page.scss'],
  standalone: false,
})
export class FavoritePage implements OnInit {
  protected readonly REDIRECT_URL = 'https://www.cheapshark.com/redirect'
  gameDeal$!: Observable<Deal | null>;
  game$!: Observable<Game | null>;


  constructor(private favoriteService: FavoriteService, private gameProvider: GameProvider) {}

  async ngOnInit() {

    this.gameDeal$ = this.favoriteService.favoriteDeal$;

    this.game$ = this.favoriteService.favoriteDeal$.pipe(
      switchMap(favDeal => {
        if (!favDeal?.gameId) return of(null);
        return from(this.gameProvider.getGameById(favDeal.gameId));
      })
    );
  }


  showSavingPercent(savings: number): number{
    return Math.round(savings)
  }


  async openBrowser(dealId: string){
    await Browser.open({url: `${this.REDIRECT_URL}?dealID=${dealId}`})
  }

}
