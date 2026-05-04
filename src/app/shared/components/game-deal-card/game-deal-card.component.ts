import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Deal } from 'src/app/core/models';
import { Subscription } from 'rxjs';
import { FavoriteService } from '../../services/favorite-service';

@Component({
  selector: 'app-game-deal-card',
  templateUrl: './game-deal-card.component.html',
  styleUrls: ['./game-deal-card.component.scss'],
  standalone: false,
})
export class GameDealCardComponent  implements OnChanges, OnDestroy {
  @Input({required: true}) gameDeal!: Deal;
  @Output() onDetail = new EventEmitter<Deal>;
  isFavorite: boolean = false;
  private sub!: Subscription;

  constructor(private favoriteService: FavoriteService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gameDeal'] && this.gameDeal?.id) {
      this.sub?.unsubscribe();

      this.sub = this.favoriteService.favoriteDeal$.subscribe(favoriteDeal => {
        this.isFavorite = favoriteDeal?.gameId === this.gameDeal.gameId;
      });
    }
  }

  onDealDetail(): void {
    this.onDetail.emit(this.gameDeal);
  }
  async onToggleFavorite(event: Event) {
    event.stopPropagation();
    await this.favoriteService.toggleFavorite(this.gameDeal);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
