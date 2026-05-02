import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly FAVORITE_KEY = 'favorite';
  private readonly _favoriteId$ = new BehaviorSubject<string | null>(null);
  readonly favoriteId$: Observable<string | null> = this._favoriteId$.asObservable();

  constructor(){
    this.loadFromStorage();
  }

  async toggleFavorite(dealId: string): Promise<void> {
    const current = this._favoriteId$.getValue();
    const next = current  === dealId ? null : dealId;

    this._favoriteId$.next(next);

    if(next === null){
      await Preferences.remove({ key:  this.FAVORITE_KEY })
    } else {
      await Preferences.set({ key: this.FAVORITE_KEY, value: next })
    }
  }

  private async loadFromStorage(): Promise<void> {
    const { value } = await Preferences.get({ key: this.FAVORITE_KEY });

    if(value){
      this._favoriteId$.next(value);
    }
  }


}
