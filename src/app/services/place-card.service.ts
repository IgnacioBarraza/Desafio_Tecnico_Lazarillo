import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlaceList } from "../utils/interfaces";

@Injectable({
  providedIn: 'root'
})
export class PlaceCardService {
  private placeData: BehaviorSubject<any> = new BehaviorSubject({});
  private mapData: BehaviorSubject<PlaceList[]> =  new BehaviorSubject({} as PlaceList[]);

  placeData$: Observable<any> = this.placeData.asObservable();
  mapData$: Observable<PlaceList[]> = this.mapData.asObservable();

  formattedPlaces: PlaceList[] = []

  constructor() { }

  formatPlaces(places: any[]) {
    this.formattedPlaces = [];
    places.map( place => {
      if (place.tags["name"] !== undefined && place.tags["addr:city"] !== undefined && place.tags["addr:country"] !== undefined) {
        const formattedPlace: PlaceList = {
          id: place.id,
          name: place.tags["name"],
          city: place.tags["addr:city"],
          country: place.tags["addr:country"],
          lat: place.lat,
          lon: place.lon
        }
        this.formattedPlaces.push(formattedPlace);
      }
    })
    return this.formattedPlaces
  }

  setPlaceList(places: any) {
    this.placeData.next(places.elements);
  }

  setMapPlaces(places: PlaceList[]) {
    console.log(places);
    this.mapData.next(places)
  }
}
