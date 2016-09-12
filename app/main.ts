import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { FirstComponent } from './components/first.component';
import { enableProdMode } from '@angular/core';
import { DataEditorHabHygComponent } from './data-editor-habhyg/data-editor-habhyg.component';
import { HabHygService } from './shared/services/habhyg.service';
import { BaseComponent } from './shared/components/base.component';
// import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { AppModule } from './app.module';
import { RouteNotFoundComponent } from './shared/components/route-not-found.component';
import { StarData } from './shared/models/star.data';
import { HabHygDetailComponent } from './habhyg-detail/habhyg-detail.component';

enableProdMode();

// bootstrap(AppModule
//     ,[
//         , DataEditorHabHygComponent
//         , HabHygService
//         , HTTP_PROVIDERS
//         , disableDeprecatedForms()
//     	, provideForms()
//     ])
//     .then(success => console.log(`Bootstrap success`))
//     .catch(error => console.log(error));

 import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 platformBrowserDynamic().bootstrapModule(AppModule
 ,[
        DataEditorHabHygComponent
        // , {providers: [HTTP_PROVIDERS]}
        , HabHygService
        , HTTP_PROVIDERS
        , disableDeprecatedForms()
    	, provideForms()
        , HabHygDetailComponent
        , RouteNotFoundComponent
    ]);
