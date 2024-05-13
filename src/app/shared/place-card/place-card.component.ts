import { Component, OnInit } from '@angular/core';
import { PlaceList } from '../../utils/interfaces';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-place-card',
  standalone: true,
  imports: [],
  templateUrl: './place-card.component.html',
  styleUrl: './place-card.component.css'
})
export class PlaceCardComponent implements OnInit{

  favoritePlaces: PlaceList[] = [];

  constructor(private fs: FirebaseService) {}

  ngOnInit(): void {
    this.favoritePlaces = [];
    this.fs.getPlaces().subscribe(res => {
      console.log(res);
      if (res.length > 0) {
        res.map( place => {
          console.log(place.data);
          this.favoritePlaces.push(place.data);
        })
      } else {
        console.log('No places to show');
      }
    })
  }

  deleteFromFavorites(index: number) {
    console.log(index);
  }
}
