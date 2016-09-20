// import { HttpModule } from '@angular/http';
import { enableProdMode } from '@angular/core';
// import { ModuleWithProviders } from '@angular/core';

import { DataEditorHabHygComponent } from './data-editor-habhyg/data-editor-habhyg.component';
import { HabHygService } from './shared/services/habhyg.service';
import { BaseComponent } from './shared/components/base.component';
import { AppModule } from './app.module';
import { RouteNotFoundComponent } from './shared/components/route-not-found.component';
import { StarData } from './shared/models/star.data';
import { HabHygDetailComponent } from './habhyg-detail/habhyg-detail.component';

// import { bootstrap } from '@angular/platform-browser-dynamic';
// import { FormsModule } from '@angular/forms';
// import { MainNavigationComponent } from './main-navigation/main-navigation.component';

enableProdMode();

// bootstrap(AppModule
//     ,[
//         , DataEditorHabHygComponent
//         , HabHygService
//         , Http
//         , disableDeprecatedForms()
//     	, provideForms()
//     ])
//     .then(success => console.log(`Bootstrap success`))
//     .catch(error => console.log(error));

 import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 platformBrowserDynamic().bootstrapModule(AppModule
 ,[
    //  FormsModule
        DataEditorHabHygComponent
        // , {providers: [Http]}
        , HabHygService
        // , HttpModule
        // , disableDeprecatedForms
    	// , provideForms
        , HabHygDetailComponent
        , RouteNotFoundComponent
    ]);
