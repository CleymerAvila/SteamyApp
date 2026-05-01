import { NgModule } from '@angular/core';
import { DealsPage } from './deals.page';

import { DealsPageRoutingModule } from './deals-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    SharedModule,
    DealsPageRoutingModule,
  ],
  declarations: [DealsPage],
})
export class DealsPageModule {}
