import { Routes } from '@angular/router';
import { MainViewComponent } from './shared/main-view/main-view.component';
import { TestComponent } from './shared/test/test.component';
import { FavoritesComponent } from './shared/favorites/favorites.component';

export const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: 'favorites',
        component: FavoritesComponent
      }
    ]
  },
  {
    path: 'test',
    component: TestComponent
  }
];
