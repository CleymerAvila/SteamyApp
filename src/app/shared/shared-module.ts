import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { GameDealCardComponent } from './components/game-deal-card/game-deal-card.component';
import { GameDealListComponent } from './components/game-deal-list/game-deal-list.component';



@NgModule({
  declarations: [GameDealCardComponent, GameDealListComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameDealCardComponent,
    GameDealListComponent
  ]
})
export class SharedModule { }
