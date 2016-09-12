
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { DataEditorHabHygComponent }  from '../app/data-editor-habhyg/data-editor-habhyg.component';
import { DataTableModule } from '../node_modules/primeng/primeng';
import { AppComponent } from '../app/app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouteNotFoundComponent } from './shared/components/route-not-found.component';
import { PlacesComponent } from './places/places.component';
import { HabHygDetailComponent } from '../app/habhyg-detail/habhyg-detail.component';
import { HTTP_PROVIDERS } from '@angular/http';

@NgModule({
  imports:[ 
            BrowserModule
            , DataTableModule
            , routing
          ]
  , declarations: [
                  AppComponent
                  , DataEditorHabHygComponent
                  , LandingPageComponent
                  , PlacesComponent
                  , RouteNotFoundComponent
                  , HabHygDetailComponent
                  ]
  , providers:  [
                appRoutingProviders
                , HTTP_PROVIDERS
                ]
  , bootstrap:  [ AppComponent ]
})
export class AppModule { }

