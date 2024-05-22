import { Component, Input, OnInit } from '@angular/core';
import { PlaceList } from '../../utils/interfaces';
import { FirebaseService } from '../../services/firebase.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PlaceCardService } from '../../services/place-card.service';

const modules = [
  MatSnackBarModule
]

@Component({
  selector: 'app-place-card',
  standalone: true,
  imports: modules,
  templateUrl: './place-card.component.html',
  styleUrl: './place-card.component.css'
})
export class PlaceCardComponent implements OnInit{

  @Input() favoritePlaces: any;
  @Input() favoritePlaceskey: any[];

  place: PlaceList;

  constructor(
    private fs: FirebaseService,
    private _snackBar: MatSnackBar,
    private placeCardService: PlaceCardService) {}

  ngOnInit(): void {
    this.place = this.favoritePlaces.data
  }

  deleteFromFavorites(placeKey: string) {
    this.favoritePlaces = [];
    this.fs.deletePlace(placeKey).then(() => {
      this.placeCardService.getFavoritesPlaces();
      this._snackBar.open('Lugar eliminado correctamente', 'Cerrar', {
        duration: 5000, // Time in mili seconds
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      })
    })
  }
}
