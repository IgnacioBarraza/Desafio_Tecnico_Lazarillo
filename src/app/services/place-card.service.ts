import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceCardService {
  private placeData: BehaviorSubject<any> = new BehaviorSubject({});
  placeData$: Observable<any> = this.placeData.asObservable()

  constructor() { }

  formatPlaces(places: any) {
    return places
  }

  setPlaceList(places: any) {
    this.placeData.next(places.elements);
  }
}
