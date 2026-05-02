import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Deal, } from 'src/app/core/models';
import { GameProvider } from 'src/app/shared/services/game-provider';
import { DealDetailComponent } from './deal-detail/deal-detail.component';

@Component({
  selector: 'app-deals',
  templateUrl: 'deals.page.html',
  styleUrls: ['deals.page.scss'],
  standalone: false,
})
export class DealsPage implements OnInit {
  top5GameDeals!: Deal[];
  gameDeals!: Deal[];

  constructor(private gameProvider: GameProvider, private modalCtrl: ModalController) {

  }

  async ngOnInit(): Promise<void> {
    this.top5GameDeals =  await this.gameProvider.getTop5Deals();
    this.gameDeals = await this.gameProvider.getDeals();
  }

  async openDealDetail(deal: Deal) {
    // this.gameProvider.getDealDetailById(dealId).subscribe(async (dealDetail) => {
    //   console.log('ESTO ES LO QUE ESTA LLEGANDO AL BUSCAR EL DETALLE: ')
    //   console.log('Deal Detail:  ', dealDetail)

    // })
    const modal  = await this.modalCtrl.create({
      component: DealDetailComponent,
      componentProps: { deal },
      cssClass: 'detail-modal',
      breakpoints: [0.95],
      initialBreakpoint: 0.95,
      handle: true
    })

    await modal.present();

  }


}
