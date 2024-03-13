import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlaceList } from "../utils/interfaces";

@Injectable({
  providedIn: 'root'
})
export class PlaceCardService {
  private placeData: BehaviorSubject<any> = new BehaviorSubject({});

  placeData$: Observable<any> = this.placeData.asObservable();

  formattedPlaces: PlaceList[] = []

  constructor() { }

  formatPlaces(places: any[]) {
    places.map( place => {
      console.log(place);
      const formattedPlace: PlaceList = {
        id: place.id,
        name: place.tags["name"],
        country: place.tags["addr:country"] !== undefined ? place.tags["addr:country"] : 'CL',
        city: place.tags["addr:city"] !== undefined ? place.tags["addr:city"] : 'Ciudad no disponible'
      }
      this.formattedPlaces.push(formattedPlace);
    })
    return this.formattedPlaces
  }

  setPlaceList(places: any) {
    this.placeData.next(places.elements);
  }
}
