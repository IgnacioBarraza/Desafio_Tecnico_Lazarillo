import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  nominatimBaseUrl: string = 'https://nominatim.openstreetmap.org/search?';
  overpassBaseUrl: string = 'https://overpass-api.de/api/interpreter?data=[out:json];node[name="'
  

  constructor(private http: HttpClient) { }

  searchNominatim(query: string) {
    return this.http.get(`${this.nominatimBaseUrl}format=json&q=${query}`);
  }

  searchOverpass(query: string) { 
    return this.http.get(`${this.overpassBaseUrl}${query}"];out;`)
  }
}
