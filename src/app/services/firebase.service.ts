import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { map } from 'rxjs';
import { PlaceList } from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  getPlaces() {
    return this.db.list('places').snapshotChanges().pipe(
      map(places => {
        return places.map(place => {
          const key = place.key;
          const data = place.payload.val() as PlaceList;
          return {key, data};
        })
      })
    );
  }

  getPlaceById(key: string) {
    return this.db.list(`places/${key}`).snapshotChanges().pipe(
      map(places => {
        return places.map(place => {
          const data: any = place.payload.val()
          return data
        })
      })
    )
  }

  addPlace(newPlace: PlaceList): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.list('places').push(newPlace)
        .then(() => {
          console.log('Place added successfully');
          resolve(); // Resolve the promise if the operation is successful
        })
        .catch(error => {
          console.error('Error adding place:', error);
          reject(error); // Reject the promise if there's an error
        });
    });
  }
  
  deletePlace(key: string): Promise<void> {
    return this.db.list('places').remove(key)
      .then(() => {
        console.log('Place deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting place:', error);
        throw error; // Re-throw the error for handling in the component if needed
      });
  }
}
