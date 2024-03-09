import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { map } from 'rxjs';
import { Place } from '../utils/interfaces';

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
          const data = place.payload.val() as Place;
          return {key, data};
        })
      })
    );
  }

  addPlace(newPlace: Place): Promise<void> {
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