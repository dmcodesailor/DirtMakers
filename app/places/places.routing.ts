import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlacesComponent } from './places.component';
import { PlaceDetailsComponent } from './place-details.component';

const placesRoutes: Routes = [
  { path: 'places', component: PlacesComponent }
  , { path: 'place/:id', component: PlaceDetailsComponent }
];

export const placesRouting: ModuleWithProviders = RouterModule.forChild(placesRoutes);