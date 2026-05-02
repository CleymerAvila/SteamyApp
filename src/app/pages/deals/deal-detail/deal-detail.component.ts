import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Deal, DealDetail } from 'src/app/core/models';

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.scss'],
  standalone: false,
})
export class DealDetailComponent  implements OnInit {

  @Input() deal!: Deal;
  loading: boolean = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  closeModal(): void {
    this.modalCtrl.dismiss();
  }
}
