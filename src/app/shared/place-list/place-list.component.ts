import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaceCardService } from '../../services/place-card.service';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";

const modules = [
  MatPaginatorModule,
  MatPaginator
]
@Component({
  selector: 'app-place-list',
  standalone: true,
  imports: modules,
  templateUrl: './place-list.component.html',
  styleUrl: './place-list.component.css',
})
export class PlaceListComponent implements OnInit, OnDestroy {

  onDestroy$: Subject<boolean> = new Subject();

  places: any[] = [];

  constructor(private placeService: PlaceCardService) {}

  ngOnInit(): void {
    this.placeService.placeData$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        console.log(res);
        this.places = Array.from(res);
      });
    
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
