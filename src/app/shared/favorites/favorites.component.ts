import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { PlaceCardComponent } from '../place-card/place-card.component';
import { FirebaseService } from '../../services/firebase.service';
import { PlaceList } from '../../utils/interfaces';
import { MapComponent } from '../map/map.component';
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { PlaceCardService } from '../../services/place-card.service';
import { Subject, takeUntil } from 'rxjs';

const modules = [
  NavbarComponent,
  FooterComponent,
  PlaceCardComponent,
  MapComponent,
  MatSnackBarModule
]

@Component({
    selector: 'app-favorites',
    standalone: true,
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css',
    imports: modules
})
export class FavoritesComponent implements OnInit, OnDestroy{

  favoritePlaces: any[];
  favoritePlace: PlaceList[] = [];
  onDestroy$ = new Subject<boolean>();

  constructor(
    private fs: FirebaseService, 
    private _snackBar: MatSnackBar,
    private placeCardService: PlaceCardService) {}

  ngOnInit(): void {
    this.getFavoritePlaces();

    this.placeCardService.favoritePlaces
      .asObservable()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( (_) => {
        this.getFavoritePlaces()
      })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true)
  }

  getFavoritePlaces() {
    this.favoritePlaces = [];
    this.fs.getPlaces().subscribe( places => {
      places.map( place => {
        this.favoritePlaces.push(place);
      })
    })
  }

  getSpecificPlace(key: string) {
    this.fs.getPlaceById(key).subscribe(res => {
      const favoritePlace: PlaceList = {
        city: res[0],
        country: res[1],
        id: res[2],
        lat: res[3],
        lon: res[4],
        name: res[5],
      }
      this.favoritePlace.push(favoritePlace);
    });
  }

  
}
