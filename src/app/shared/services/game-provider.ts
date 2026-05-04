import { DealDetailApiModel, GameApiModel, GameDealApiModel, StoreApiModel } from './../../core/models/api-response.model';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, pipe, switchMap } from 'rxjs';
import { DealMapper } from 'src/app/core/mappers/deal.mapper';
import { Deal, DealApiModel, DealDetail, Game, GameDeal } from 'src/app/core/models';
import { HttpService } from 'src/app/core/services/http.service';
import { map } from 'rxjs';
import { GameMapper } from 'src/app/core/mappers/game.mapper';

@Injectable({
  providedIn: 'root',
})
export class GameProvider {

  constructor(private http: HttpService){}

  public async getTop5Deals(): Promise<Deal[]>{
    const dealsWithStore$ = this.http.get<DealApiModel[]>(`deals?pageSize=${5}`)
    .pipe(
      switchMap((dealsApi) => {
        return this.http.get<StoreApiModel[]>('stores').pipe(
          map((storesApi) => DealMapper.fromDealApiListToDealList(dealsApi, storesApi))
        )
      })
    )

    return firstValueFrom(dealsWithStore$);
  }

  public async getDeals(): Promise<Deal[]> {
    const deals$ = this.http.get<DealApiModel[]>(`deals?pageSize=${30}`)
    .pipe(
        switchMap((dealsApi) => {
        return this.http.get<StoreApiModel[]>('stores').pipe(
          map((storesApi) => DealMapper.fromDealApiListToDealList(dealsApi, storesApi))
        )
      })
    )

    return firstValueFrom(deals$);
  }

  public async getGameById(gameId: string): Promise<Game> {
    const game$ = this.http.get<GameApiModel>(`games?id=${gameId}`) // ← GameApiModel, no Game
    .pipe(
      switchMap((gameApi) => {
        return this.http.get<StoreApiModel[]>('stores').pipe(
          map((storesApi) => {
            const deals = GameMapper.gameDealApiListToGameDealList(gameApi.deals, storesApi);
            return GameMapper.mapFromGameApiModelToGame(gameApi, deals); // ← mapea el objeto completo
          })
        );
      })
    );

    return firstValueFrom(game$);
  }

  public getDealsBySearch(query: string): Observable<Deal[]> {
    return this.http.get<DealApiModel[]>(`deals?title=${query}`)
          .pipe(map(dealsApi => DealMapper.fromDealApiListToDealList(dealsApi)))
  }

  public getDealDetailById(dealId: string): Observable<DealDetail> {
    const dealDetail$ = this.http.get<DealDetailApiModel>(`deals?id=${dealId}`)
    .pipe(map(dealDetail => DealMapper.fromDealDetailApiToDealDetail(dealDetail)))

    return dealDetail$;
  }

}
