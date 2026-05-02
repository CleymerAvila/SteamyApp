import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deal, GameSummary } from 'src/app/core/models';

@Component({
  selector: 'app-game-deal-card',
  templateUrl: './game-deal-card.component.html',
  styleUrls: ['./game-deal-card.component.scss'],
  standalone: false,
})
export class GameDealCardComponent  implements OnInit {
  @Input({required: true}) gameDeal!: Deal;
  @Output() onDetail = new EventEmitter<Deal>;

  constructor() { }

  ngOnInit() {}


  onDealDetail(): void {
    this.onDetail.emit(this.gameDeal);
  }
}
