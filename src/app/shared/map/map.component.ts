import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.fullscreen';
import { OsmService } from '../../services/osm.service';
import { PlaceCardService } from '../../services/place-card.service';
import { Subject, takeUntil } from 'rxjs';
import { PlaceList } from '../../utils/interfaces';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<boolean> = new Subject();

  map: any;
  places: any;
  options = [
    {name: 'Museos', query: 'museum', category: 'tourism'},
    {name: 'Bares / Pubs', query: 'bar', category: 'amenity'},
    {name: 'Bancos', query: 'bank', category: 'amenity'},
    {name: 'Universidades', query: 'university', category: 'amenity'},
    {name: 'Restaurantes', query: 'restaurant', category: 'amenity'},
  ]
  optionSelected: any[] = [];
  isMapData: boolean = false;
  markersLayer: any;
  isAddingMarkers: boolean = true;

  constructor(private osm: OsmService, private placeService: PlaceCardService) {}

  ngOnInit(): void {
    this.placeMenu();
    this.initMap();
    this.placeService.mapData$.pipe(takeUntil(this.onDestroy$)).subscribe(places => {
      if (places.length > 0) {
        const startSetMarkers = performance.now();
        this.setMarkers(places);
        const endSetMarkers = performance.now();
        this.isAddingMarkers = false
        this.isMapData = true;
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  initMap() {
    this.map = L.map('map', {
      center: [-33.4481648562531, -70.66892986850647],
      zoom: 11,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topleft',
        content: '<i class="fa-solid fa-expand fa-lg"></i>',
      }
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);
  }

  setMarkers(places: PlaceList[]) {
    // Clear existing markers from the map
    this.markersLayer.clearLayers();
    this.isAddingMarkers = true;

    places.forEach(place => {
      const marker = L.marker([place.lat, place.lon]);
      marker.bindPopup(`<b>${place.name}</b><br>${place.city}, ${place.country}`).openPopup();
      this.markersLayer.addLayer(marker);
    });

    this.isAddingMarkers = false;
  }

  placeMenu() {
    const optionMenu = document.querySelector(".place-select-menu")
    const selectBtn = optionMenu.querySelector(".select-btn")
    const options = optionMenu.querySelectorAll(".place-option")
    const btn_text = optionMenu.querySelector(".btn-text");

    selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));       

    options.forEach(option =>{
      option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text").textContent;
        btn_text.textContent = selectedOption;
        optionMenu.classList.remove("active");
      });
    });

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (!optionMenu.contains(target) && !selectBtn.contains(target)) {
        optionMenu.classList.remove("active");
      }
    });
  }

  closePeriodMenu() {
    const optionMenu = document.querySelector(".place-select-menu");
    if (optionMenu.classList.contains("active")) {
      optionMenu.classList.remove("active");
    }
  }

  getPlaceData(index: number) {
    this.optionSelected = [];
    this.optionSelected.push(this.options[index].name);
    this.osm.searchOverpass(this.options[index].query, this.options[index].category).subscribe(res => {
      this.placeService.setPlaceList(res);
    })
  }

  showSpinner() {
    this.isAddingMarkers = true;
  }

  hideSpinner() {
    this.isAddingMarkers = false;
  }
}
