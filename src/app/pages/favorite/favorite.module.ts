import { NgModule } from '@angular/core';
import { FavoritePage } from './favorite.page';

import { FavoritePageRoutingModule } from './favorite-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    SharedModule,
    FavoritePageRoutingModule,
  ],
  declarations: [FavoritePage],
})
export class FavoritePageModule {}
