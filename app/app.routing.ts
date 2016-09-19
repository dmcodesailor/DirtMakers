import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataEditorHabHygComponent } from './data-editor-habhyg/data-editor-habhyg.component';
import { RouteNotFoundComponent } from './shared/components/route-not-found.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
// import { LoginComponent } from './login/login.component';
import { HabHygDetailComponent } from './habhyg-detail/habhyg-detail.component';
import { loginRoutes, authProviders }      from './login.routing';
import { BclModule } from './bcl/bcl.module';

const appRoutes: Routes = [
  { path: 'bcl', loadChildren: 'app/bcl/bcl.module#BclModule' }
  , { path: '', component: LandingPageComponent, pathMatch: 'full' }
  , { path: 'star/:id', component: HabHygDetailComponent }
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
  authProviders
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);