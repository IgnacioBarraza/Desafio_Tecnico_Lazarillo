import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
import 'leaflet.fullscreen'
import { OsmService } from '../../services/osm.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{

  map: any;
  places: any;
  options = [
    {name: 'Museos', query: 'museum', category: 'tourism'},
    {name: 'Bares / Pubs', query: 'bar', category: 'amenity'},
    {name: 'Bancos', query: 'bank', category: 'amenity'},
    {name: 'Universidades', query: 'university', category: 'amenity'},
    {name: 'Metro', query: 'station', category: 'public_transport'},
    {name: 'Restaurantes', query: 'restaurant', category: 'amenity'},
  ]
  optionSelected: any[] = [];

  constructor(private osm: OsmService) {}

  ngOnInit(): void {
    this.placeMenu();
    this.createMap()
  }

  createMap() {
    this.map = L.map('map', {
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topleft',
        content: '<i class="fa-solid fa-expand fa-lg"></i>',
      }
    }).setView([-33.4481648562531, -70.66892986850647], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
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
    this.optionSelected = []
    console.log(this.options[index]);
    this.optionSelected.push(this.options[index].name);
    this.osm.searchOverpass(this.options[index].query, this.options[index].category).subscribe(res => {
      console.log(res);
    })
  }
}
