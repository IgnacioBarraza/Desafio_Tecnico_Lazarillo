import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaceCardService } from '../../services/place-card.service';
import { Subject, takeUntil } from 'rxjs';
import { PaginatorComponent } from '../paginator/paginator.component';
import { PlaceList } from '../../utils/interfaces';
import { FirebaseService } from '../../services/firebase.service';

const modules = [
  PaginatorComponent
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

  places: PlaceList[] = [];
  paginatedPlaces: PlaceList[] = []
  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  mobileView: boolean = false;

  constructor(private placeService: PlaceCardService, private fs: FirebaseService) {
    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  ngOnInit(): void {
    this.mobileView = window.innerWidth < 500 ? true : false;
    if (this.mobileView) {
      this.itemsPerPage = 3;
    }
    this.placeService.placeData$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(res => {
        if (Array.from(res).length > 0) {
          const formattedPlaces = this.placeService.formatPlaces(res);
          this.places = formattedPlaces;
          this.placeService.setMapPlaces(formattedPlaces);
          this.currentPage = 1;
          this.totalPages = Math.ceil(this.places.length / this.itemsPerPage);
          this.updatePaginatedPlaces();
        }
      });
    
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updatePaginatedPlaces()
  }

  updatePaginatedPlaces(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPlaces = this.places.slice(startIndex, endIndex);
  }

  handleResize() {
    this.mobileView = window.innerWidth < 700 ? true : false;
  }

  addToFavorites(index: number) {
    console.log(this.places[index]);
    this.fs.addPlace(this.places[index]);
  }
}
