import { Routes } from '@angular/router';
import { MainViewComponent } from './shared/main-view/main-view.component';
import { FavoritesComponent } from './shared/favorites/favorites.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Desafió Técnico Lazarillo',
    component: MainViewComponent,
  },
  {
    path: 'favorites',
    title: 'Favoritos',
    component: FavoritesComponent
  },
];
