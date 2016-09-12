import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataEditorHabHygComponent } from './data-editor-habhyg/data-editor-habhyg.component';
import { RouteNotFoundComponent } from './shared/components/route-not-found.component';
import { PlacesComponent } from './places/places.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
// import { LoginComponent } from './login/login.component';
import { HabHygDetailComponent } from './habhyg-detail/habhyg-detail.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent }
  // , { path: 'login', component: LoginComponent }
  , { path: 'star/:id', component: HabHygDetailComponent }
  , { path: 'places', component: PlacesComponent }
  , { path: 'habhyg', component: DataEditorHabHygComponent }
  , { path: '**', component: RouteNotFoundComponent }
//   {
//     path: 'habhyg',
//     component: DataEditorHabHygComponent,
//     data: {
//       title: 'HabHyg Data Editor'
//     }
//   },
//   , { path: 'place/:id', component: PlaceDetailComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);