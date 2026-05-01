import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpService } from './services/http.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    provideHttpClient(withFetch())
  ]
})
export class CoreModule { }
