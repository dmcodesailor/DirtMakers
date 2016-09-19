import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { DataEditorHabHygComponent }  from '../app/data-editor-habhyg/data-editor-habhyg.component';
import { DataTableModule } from '../node_modules/primeng/primeng';
import { AppComponent } from '../app/app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouteNotFoundComponent } from './shared/components/route-not-found.component';
import { HabHygDetailComponent } from '../app/habhyg-detail/habhyg-detail.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { PlacesModule } from '../app/places/places.module';
import { BclModule } from '../app/bcl/bcl.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports:[ 
            BrowserModule
            , DataTableModule
            , routing
            , PlacesModule
            , BclModule
          ]
  , declarations: [
                  AppComponent
                  , DataEditorHabHygComponent
                  , LandingPageComponent
                  , RouteNotFoundComponent
                  , HabHygDetailComponent
                  , LoginComponent
                  ]
  , providers:  [
                appRoutingProviders
                , HTTP_PROVIDERS
                ]
  , bootstrap:  [ AppComponent ]
})
export class AppModule { }

