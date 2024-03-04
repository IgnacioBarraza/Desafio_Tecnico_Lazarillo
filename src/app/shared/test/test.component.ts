import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { FirebaseService } from '../../services/firebase.service';
import { first } from 'rxjs';
import { PlaceData, PlaceToDB } from "../../utils/interfaces";

const modules = [
  ReactiveFormsModule
]
@Component({
  selector: 'app-test',
  standalone: true,
  imports: modules,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{

  testGroup = new FormGroup({
    placeName: new FormControl<string>(''),
    placeAddress: new FormControl<string>(''),
    placeId: new FormControl<string>(''),
    placeAlias: new FormControl<string>('')
  })

  originalPlaces: any[] = [];
  places: any[] = [];

  constructor(private fs: FirebaseService) {}

  ngOnInit(): void {
    
  }

  submit() {
    const { placeName, placeAddress, placeId, placeAlias } = this.testGroup.value;
    const newPlace: PlaceToDB = {
      placeName: placeName || '',
      placeAddress: placeAddress || '',
      placeId: placeId || '',
      placeAlias: placeAlias || ''
    }
    this.fs.addPlace(newPlace)
    .then(() => {
      this.testGroup.reset(); // Reset the form after successful submission
    })
    .catch(error => {
      console.error(error);
    });
  }

  getPlaces() {
    this.originalPlaces = [];
    this.places = [];
    this.fs.getPlaces().pipe(first()).subscribe(res => {
      res.map(place => {
        const formattedPlace = {
          name: place.data.placeName,
          alias: place.data.placeAlias,
          address: place.data.placeAddress
        };
        this.originalPlaces.push(place);
        this.places.push(formattedPlace);
      });
    });
  }

  deletePlace(index: number) {
    console.log(this.originalPlaces[index]);
    this.fs.deletePlace(this.originalPlaces[index].key);
    this.getPlaces();
  }
}
