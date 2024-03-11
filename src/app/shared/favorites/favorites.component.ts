import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

const modules = [
  NavbarComponent,
  FooterComponent
]

@Component({
    selector: 'app-favorites',
    standalone: true,
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css',
    imports: modules
})
export class FavoritesComponent {

}
