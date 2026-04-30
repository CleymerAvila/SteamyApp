import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DealsPage } from './deals.page';

import { DealsPageRoutingModule } from './deals-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DealsPageRoutingModule,
  ],
  declarations: [DealsPage],
})
export class DealsPageModule {}
