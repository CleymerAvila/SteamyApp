import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deal } from 'src/app/core/models';

@Component({
  selector: 'app-game-deal-list',
  templateUrl: './game-deal-list.component.html',
  styleUrls: ['./game-deal-list.component.scss'],
  standalone: false,
})
export class GameDealListComponent  implements OnInit {
  @Input({required: true}) gameDeals!: Deal[];
  @Input() modeHorizontal: boolean = false;
  @Output() onDealDetail = new EventEmitter<Deal>;

  constructor() { }

  ngOnInit() {}

  onDealDetailClick(deal: Deal): void {
    this.onDealDetail.emit(deal);
  }

}
