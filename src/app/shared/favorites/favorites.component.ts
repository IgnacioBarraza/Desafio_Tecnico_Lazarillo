import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { PlaceCardComponent } from '../place-card/place-card.component';
import { FirebaseService } from '../../services/firebase.service';
import { PlaceList } from '../../utils/interfaces';
import { MapComponent } from '../map/map.component';

const modules = [
  NavbarComponent,
  FooterComponent,
  PlaceCardComponent,
  MapComponent
]

@Component({
    selector: 'app-favorites',
    standalone: true,
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css',
    imports: modules
})
export class FavoritesComponent implements OnInit{

  favoritePlaces: PlaceList[] = [];
  placesKey: any[] = [];
  favoritePlace: PlaceList[] = [];

  constructor(private fs: FirebaseService) {}

  ngOnInit(): void {
    this.getFavoritePlaces();
  }

  getFavoritePlaces() {
    this.favoritePlaces = [];
    this.placesKey = [];
    this.fs.getPlaces().subscribe( places => {
      places.map( place => {
        this.favoritePlaces.push(place.data);
        this.placesKey.push(place.key);
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
    console.log(this.favoritePlace);
  }

  deleteFromFavorites(index: number) {
    console.log(this.placesKey[index]);
    this.fs.deletePlace(this.placesKey[index]).then( () => {
      console.log('Lugar eliminado correctamente');
      this.getFavoritePlaces()
    })
  }
}
