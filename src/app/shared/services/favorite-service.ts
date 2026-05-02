import { Injectable, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deal } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService implements OnInit {
  private readonly FAVORITE_KEY = 'favorite';
  private readonly _favoriteDeal$ = new BehaviorSubject<Deal | null>(null);
  readonly favoriteDeal$: Observable<Deal | null> = this._favoriteDeal$.asObservable();

  constructor(){
    this.ngOnInit();
  }

  async ngOnInit() {
    await this.loadFromStorage();
  }

  async toggleFavorite(deal: Deal): Promise<void> {
    const current = this._favoriteDeal$.getValue();
    const next = current  === deal ? null : deal;

    this._favoriteDeal$.next(next);

    if(next === null){
      await Preferences.remove({ key:  this.FAVORITE_KEY })
    } else {
      await Preferences.set({ key: this.FAVORITE_KEY, value: JSON.stringify(next)})
    }
  }

  private async loadFromStorage(): Promise<void> {
    const { value } = await Preferences.get({ key: this.FAVORITE_KEY });

    if(value){
      const favorite: Deal = JSON.parse(value) as Deal;
      this._favoriteDeal$.next(favorite);
    }
  }


}
