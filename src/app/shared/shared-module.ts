import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { GameDealCardComponent } from './components/game-deal-card/game-deal-card.component';
import { GameDealListComponent } from './components/game-deal-list/game-deal-list.component';
import { GameDealCardSkeletonComponent } from './components/game-deal-card-skeleton/game-deal-card-skeleton.component';
import { NoFavoriteStateComponent } from './components/no-favorite-state/no-favorite-state.component';
import { RouterModule } from '@angular/router';
import { NoContentStateComponent } from './components/no-content-state/no-content-state.component';



@NgModule({
  declarations: [
    GameDealCardComponent,
    GameDealListComponent,
    GameDealCardSkeletonComponent,
    NoFavoriteStateComponent,
    NoContentStateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameDealCardComponent,
    GameDealListComponent,
    GameDealCardSkeletonComponent,
    NoFavoriteStateComponent,
    NoContentStateComponent,
  ]
})
export class SharedModule { }
