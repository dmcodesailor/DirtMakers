import { Component, OnInit } from '@angular/core';
import {MdButtonModule} from '@angular2-material/button';
import { DistanceConvert } from '../shared/utilities/DistanceConvert';
import { HabHygService } from '../shared/services/habhyg.service';
import { StarData } from '../shared/models/star.data';
import { Coordinates } from '../shared/models/coordinates';
import { Distances } from '../shared/models/distances';
import { DirtMakerStarData } from '../shared/models/dirt.maker.star.data';

@Component({
    selector: 'travel-computer'
    , templateUrl: 'app/travel/travel.component.html'
    // , directives: [MdButtonModule]
})
export class TravelComponent implements OnInit {
    
    public data:Array<StarData> = new Array<StarData>();
    public originId:number;
    public destinationId:number;
    public distances:Distances;

    constructor(private habhygService: HabHygService) { }

    ngOnInit() { 
        this.GetData();
    }

    /**
     * 
     */
    public Compute() {
        if (this.data.length > 0) {
            this.GetData();
        }

        // With loaded data, find the origin and destination stars.
        let originStar:StarData = this.data.find(sd => sd.id == this.originId);
        let destinationStar:StarData = this.data.find(sd => sd.id == this.destinationId);
        
        // Compute the distance between the stars and convert to other units.
        let parsecs = this.ComputeDistance(originStar, destinationStar);
        this.ApplyUnitConversions(parsecs);    
    }

    /**
     * Formula:  square root ((originX - destinationX)^2 + (originY - destinationY)^2 + (originZ - destinationZ)^2)
     */
    private ComputeDistance(originStar:StarData, destinationStar:StarData) : number {
        let result = 0;
        let deltaX = (originStar.x - destinationStar.x)^2;
        let deltaY = (originStar.y - destinationStar.y)^2;
        let deltaZ = (originStar.z - destinationStar.z)^2;
        result = Math.sqrt(deltaX + deltaY + deltaZ);
        return result;
    }

    /**
     * 
     */
    private ApplyUnitConversions(parsecs:number) {
        let dc:DistanceConvert = new DistanceConvert();
        this.distances = new Distances();
        this.distances.Parsecs = parsecs;
        this.distances.AstronomicalUnits = dc.ParsecsToAstronomicalUnits(parsecs);
        this.distances.Kilometers = dc.ParsecsToKilometers(parsecs);
        this.distances.Lightdays = dc.ParsecsToLightdays(parsecs);
        this.distances.Lightyears = dc.ParsecsToLightYears(parsecs);
    }

    /**
     * 
     */
    private GetData() {
        this.data = new Array<StarData>();

        // this.habhygService.get().subscribe(habhygRecord => {
        //     // Set the base habhyg properties.
        //     let starData:DirtMakerStarData = new DirtMakerStarData();
        //     starData.AbsoluteMagnitude = habhygRecord.absmag;
        //     // starData.ApparentMagnitude = habhygRecord.mag;
        //     starData.BayerFlamsteedDesignation = habhygRecord.bf;
        //     // starData.ColorIndex = habhygRecord.ci;
        //     // starData.Declination = habhygRecord.dec;
        //     starData.DistanceInParsecs = habhygRecord.dist;
        //     starData.GlieseCatalogId = habhygRecord.gl;
        //     starData.HarvardRevisedCatalogId = habhygRecord.hr;
        //     starData.HenryDraperCatalogId = habhygRecord.hd;
        //     starData.HipparcosCatalogId = habhygRecord.hip;
        //     starData.id = habhygRecord.id;
        //     // starData.Luminosity = habhygRecord.lum;
        //     // starData.RightAscension = habhygRecord.ra;
        //     starData.SpectralType = habhygRecord.spect;

        //     // Set the coordinates as an aggregate object.
        //     let coords:Coordinates = new Coordinates();
        //     coords.x = habhygRecord.x;
        //     coords.y = habhygRecord.y;
        //     coords.z = habhygRecord.z;
        //     starData.Coordinates = coords;

        //     // Load Dirt Maker specific properties.

        //     this.data.push(starData);
        // });
    }
}
