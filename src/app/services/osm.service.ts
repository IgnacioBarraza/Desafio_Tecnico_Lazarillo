import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OsmService {

  baseUrl: string = 'https://nominatim.openstreetmap.org/search?';
  overpass: string = 'https://overpass-api.de/api/interpreter'
  

  constructor(private http: HttpClient) { }

  searchNominatim(query: string) {
    return this.http.get(`${this.baseUrl}format=json&q=${query}`);
  }

  searchOverpass(query: string, category: string) {
    const overpassQuery = `
      [out:json][timeout:25];
      area(id:3600167454)->.searchArea;
      nwr["${category}"="${query}"](area.searchArea);
      out;
    `;
    return this.http.get(`${this.overpass}?data=${overpassQuery}`)
  }

}
