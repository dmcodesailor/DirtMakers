import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';

import { MenuModule }                   from 'primeng/primeng';

import { routing, appRoutingProviders } from './app.routing';
import { LandingPageComponent }         from './landing-page/landing-page.component';
import { LoginComponent }               from './login.component';
import { LogoutComponent }              from './logout.component';
import { DialogComponent }              from './shared/components/dialog.component';
import { RouteNotFoundComponent }       from './shared/components/route-not-found.component';
import { AppComponent }                 from '../app/app.component';
import { BclModule }                    from '../app/bcl/bcl.module';
import { DataEditorHabHygComponent }    from '../app/data-editor-habhyg/data-editor-habhyg.component';
import { HabHygDetailComponent }        from '../app/habhyg-detail/habhyg-detail.component';
import { PlacesModule }                 from '../app/places/places.module';

@NgModule({
  imports:[ 
            BrowserModule
            , routing
            , PlacesModule
            , BclModule
            , MenuModule
          ]
  , declarations: [
                    AppComponent
                    , DataEditorHabHygComponent
                    , LandingPageComponent
                    , RouteNotFoundComponent
                    , HabHygDetailComponent
                    , LoginComponent
                    , LogoutComponent
                  ]
  , exports: [
                BrowserModule
                , MenuModule
             ]
  , providers:  [
                  appRoutingProviders
                ]
  , bootstrap:  [ AppComponent ]
})
export class AppModule { }

