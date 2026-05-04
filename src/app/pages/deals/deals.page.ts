import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Deal, } from 'src/app/core/models';
import { GameProvider } from 'src/app/shared/services/game-provider';
import { DealDetailComponent } from './deal-detail/deal-detail.component';
import { catchError, debounceTime, distinctUntilChanged, of, pipe, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-deals',
  templateUrl: 'deals.page.html',
  styleUrls: ['deals.page.scss'],
  standalone: false,
})
export class DealsPage implements OnInit, OnDestroy {
  top5GameDeals!: Deal[];
  gameDeals!: Deal[];
  private searchTerm$ = new Subject<string>;
  private destroy$ = new Subject<void>;
  searchedDeals: Deal[] = [];
  loading = true;
  loadingSearch = false;
  hasError = false;
  error: string = '';
  constructor(private gameProvider: GameProvider, private modalCtrl: ModalController) {

  }

  async ngOnInit(): Promise<void> {
    this.top5GameDeals =  await this.gameProvider.getTop5Deals();
    this.gameDeals = await this.gameProvider.getDeals();

    if(!this.top5GameDeals || !this.gameDeals){
      this.hasError = true;
    } else if(this.top5GameDeals && this.gameDeals){
      this.hasError = false;
    }
    this.searchedDeals = [];
    this.loading = false;
    this.subscribeToSearchChanges();
  }

  async openDealDetail(deal: Deal) {
    const modal  = await this.modalCtrl.create({
      component: DealDetailComponent,
      componentProps: { deal },
      cssClass: 'detail-modal',
      breakpoints: [0.95],
      backdropDismiss: false,
      showBackdrop: true,
      initialBreakpoint: 0.95,
      handle: true
    })

    await modal.present();

  }

  private subscribeToSearchChanges(): void {
      this.searchTerm$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query || query.trim().length < 2) {
          this.searchedDeals = [];
          this.loadingSearch = false;
          this.hasError = false;
          return of([]);
        }
        return this.gameProvider.getDealsBySearch(query).pipe(
          catchError(() => {
            this.loadingSearch = false;
            this.hasError = true;
            this.error = 'Error al buscar. Intenta de nuevo.';
            return of([]);
          })
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe(results => {
      console.log('Results : ' + results)
      if(results.length === 0){
        this.searchedDeals = results;
      } else {
        this.searchedDeals = results;
      }
      this.loadingSearch = false;
      this.hasError = false;
    });
  }

  onSearch(event: any){
    const query = event.target.value;

    if(query && query.trim() != ''){
      this.loadingSearch = true;
      console.log(query)
      this.searchTerm$.next(query)
    } else {
      this.ngOnInit();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
