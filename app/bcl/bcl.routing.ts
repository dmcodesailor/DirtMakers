import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BclComponent } from './bcl.component';
import { BclPlacesComponent } from './bcl-places.component';
// import { BclCharactersComponent } from './bcl-characters.component';
// import { BclVesselsComponent } from './bcl-vessels.component';
// import { BclOrgsComponent } from './bcl-orgs.component';
// import { BclHabhygComponent } from './bcl-habhyg.component';
// import { BclTimelineComponent } from './bcl-timeline.component';
// import { BclNewsComponent } from './bcl-news.component';

const bclRoutes: Routes = [
  // { path: 'bcl', redirectTo: '/bcl', pathMatch: 'full'}
    { path: '', children: [
        { path: 'bcl', component: BclComponent }
        , { path: 'places', component: BclPlacesComponent }
        // , { path: 'characters', component: BclCharactersComponent }
        // , { path: 'vessels', component: BclVesselsComponent }
        // , { path: 'organizations', component: BclOrgsComponent }
        // , { path: 'characters', component: BclHabhygComponent }
        // , { path: 'timeline', component: BclTimelineComponent }
        // , { path: 'news', component: BclNewsComponent }
    ]}
];

export const bclRouting: ModuleWithProviders = RouterModule.forChild(bclRoutes);