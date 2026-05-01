import { Component, OnInit } from '@angular/core';
import { Deal, } from 'src/app/core/models';
import { GameProvider } from 'src/app/shared/services/game-provider';

@Component({
  selector: 'app-deals',
  templateUrl: 'deals.page.html',
  styleUrls: ['deals.page.scss'],
  standalone: false,
})
export class DealsPage implements OnInit {
  top5GameDeals!: Deal[];


  constructor(private gameProvider: GameProvider) {

  }

  async ngOnInit(): Promise<void> {
    this.top5GameDeals =  await this.gameProvider.getTop5Deals();
  }


}
