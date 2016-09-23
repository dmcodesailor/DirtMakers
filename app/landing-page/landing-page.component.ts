import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'landing-page',
    // templateUrl: 'app/landing-page/landing-page.component.html'
    template: `<div class="body-foreground">
                    <h1>Get your own dirt.</h1>
                </div>
        `
})
export class LandingPageComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}