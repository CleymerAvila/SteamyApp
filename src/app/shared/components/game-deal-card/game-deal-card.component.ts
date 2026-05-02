import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Deal } from 'src/app/core/models';
import { Preferences } from '@capacitor/preferences';
import { Subscription } from 'rxjs';
import { FavoriteService } from '../../services/favorite-service';

@Component({
  selector: 'app-game-deal-card',
  templateUrl: './game-deal-card.component.html',
  styleUrls: ['./game-deal-card.component.scss'],
  standalone: false,
})
export class GameDealCardComponent  implements OnInit, OnDestroy {
  @Input({required: true}) gameDeal!: Deal;
  @Output() onDetail = new EventEmitter<Deal>;
  isFavorite: boolean = false;
  private sub!: Subscription;

  constructor(private favoriteService: FavoriteService) { }

  async ngOnInit() {
    this.sub = this.favoriteService.favoriteId$.subscribe(favoriteId => {
      this.isFavorite = favoriteId === this.gameDeal.id
    })
  }

  onDealDetail(): void {
    this.onDetail.emit(this.gameDeal);
  }
  onToggleFavorite(event: Event) {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(this.gameDeal.id);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
