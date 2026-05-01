import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DealMapper } from 'src/app/core/mappers/deal.mapper';
import { Deal, DealApiModel } from 'src/app/core/models';
import { HttpService } from 'src/app/core/services/http.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameProvider {

  constructor(private http: HttpService){}

  public async getTop5Deals(): Promise<Deal[]>{
    return firstValueFrom(
      this.http.get<DealApiModel[]>(`deals?pageSize=${5}`)
      .pipe(
        map((dealsApi) => DealMapper.fromDealApiListToDealList(dealsApi))
      )
    )
  }

}
