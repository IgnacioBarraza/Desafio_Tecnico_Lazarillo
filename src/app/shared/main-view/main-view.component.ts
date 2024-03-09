import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PlaceCardComponent } from '../place-card/place-card.component';
import { FooterComponent } from '../footer/footer.component';

const modules = [
  MapComponent,
  NavbarComponent,
  PlaceCardComponent,
  FooterComponent
]

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: modules,
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {

}
