import { NgModule } from '@angular/core';
import { DealsPage } from './deals.page';

import { DealsPageRoutingModule } from './deals-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';
import { DealDetailComponent } from './deal-detail/deal-detail.component';

@NgModule({
  imports: [
    SharedModule,
    DealsPageRoutingModule,
  ],
  declarations: [DealsPage, DealDetailComponent],
})
export class DealsPageModule {}
