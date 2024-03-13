import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PlaceCardService } from '../../services/place-card.service';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";

const modules = [
  MatPaginatorModule,
  MatTableModule
]
@Component({
  selector: 'app-place-list',
  standalone: true,
  imports: modules,
  templateUrl: './place-list.component.html',
  styleUrl: './place-list.component.css',
})
export class PlaceListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  onDestroy$: Subject<boolean> = new Subject();

  places: any[] = [];
  displayedColumns: string[] = ['NAME', 'PAÍS', 'CIUDAD']

  dataSource = new MatTableDataSource<any>(this.places);

  constructor(private placeService: PlaceCardService) {}

  ngOnInit(): void {
    this.placeService.placeData$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(res => {
        // console.log(res);
        this.places = Array.from(res);
        if (res.length > 0) {
          const formattedPlaces = this.placeService.formatPlaces(res);
          console.log(formattedPlaces);
        }
      });
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
