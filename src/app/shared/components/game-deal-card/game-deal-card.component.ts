import { Component, Input, OnInit } from '@angular/core';
import { Deal, GameSummary } from 'src/app/core/models';

@Component({
  selector: 'app-game-deal-card',
  templateUrl: './game-deal-card.component.html',
  styleUrls: ['./game-deal-card.component.scss'],
  standalone: false,
})
export class GameDealCardComponent  implements OnInit {
  @Input({required: true}) gameDeal!: Deal;


  constructor() { }

  ngOnInit() {}

}
