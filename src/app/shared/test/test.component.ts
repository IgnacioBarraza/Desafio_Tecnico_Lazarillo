import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FirebaseService } from '../../services/firebase.service';
import { first } from 'rxjs';
import { Place } from "../../utils/interfaces";
import { OsmService } from '../../services/osm.service';

const modules = [
  ReactiveFormsModule,
  FormsModule
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
  searchPlace: string = '';

  constructor(private fs: FirebaseService, private osm: OsmService) {}

  ngOnInit(): void {
    
  }

  submit() {
    const { placeName, placeAddress, placeId, placeAlias } = this.testGroup.value;
    const newPlace: Place = {
      name: placeName || '',
      address: placeAddress || '',
      place_id: placeId || '',
      alias: placeAlias || ''
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
          name: place.data.name,
          alias: place.data.alias,
          address: place.data.address
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

  search() {
    const search = this.searchPlace
    console.log(this.searchPlace);
    this.osm.searchNominatim(search).subscribe(res => {
      console.log(res);
    })
  }

  searchOverpass() {
    const query = this.searchPlace
    this.osm.searchOverpass(query, 'amenity').subscribe(res => {
      console.log(res);
    })
  }
}
