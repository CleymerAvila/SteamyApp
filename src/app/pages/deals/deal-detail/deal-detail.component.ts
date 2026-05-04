import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Deal} from 'src/app/core/models';
import { Browser } from '@capacitor/browser'

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.scss'],
  standalone: false,
})
export class DealDetailComponent  implements OnInit {

  protected readonly REDIRECT_URL = 'https://www.cheapshark.com/redirect'

  @Input() deal!: Deal;
  loading: boolean = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  showSavingPercent(savings: number): number{
    return Math.floor(savings)
  }

  async openSite() {
    await Browser.open({url: `${this.REDIRECT_URL}?dealID=${this.deal.id}`});
  }
  closeModal(): void {
    this.modalCtrl.dismiss();
  }
}
