import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { DataListModule }                   from 'primeng/primeng';
import { DataList }                         from 'primeng/primeng';
import { SharedModule }                     from 'primeng/primeng';
import { DataTableModule }                  from 'primeng/primeng';
import { DataGrid, Column }                 from 'primeng/primeng';
import { InputTextModule }                  from 'primeng/primeng';
import { InputTextareaModule }              from 'primeng/primeng';
import { DropdownModule }                   from 'primeng/primeng';
import { SelectItem }                       from 'primeng/primeng';

import {MdButtonModule}                     from '@angular2-material/button/button';
import {MdProgressCircleModule}             from '@angular2-material/progress-circle/progress-circle';
import {MdInputModule}                      from '@angular2-material/input/input';

import { BaseComponent }                    from '../shared/components/base.component';
import { Place, Planet, City, Station }     from '../places/place';
import { PlaceType }                        from '../places/place-type';
import { PlacesService }                    from '../places/places.service';
import { DmSharedModule }                   from '../shared/dm-shared.module';
import { BclAffiliationAdminService }       from './bcl-affiliation-admin.service';
import { AffiliationService }               from '../shared/services/affiliation.service';
import { Affiliation }                      from '../shared/models/affiliation';

@Component({
    selector: 'dm-bcl-affiliation-admin',
    templateUrl: 'app/bcl/bcl-affiliations.component.html'
})
export class BclAffiliationsComponent extends BaseComponent implements OnInit {

    public affiliations:Affiliation[] = [];
    public loading:boolean = true;
    public selectedAffiliation:Affiliation;
    private displayDialog:boolean = false;
    private actionMode:string = "New";

    constructor(private route:ActivatedRoute
                , private router:Router
                , private adminService:BclAffiliationAdminService
                , private readService:AffiliationService) {
        super();
     }
    ngOnInit() {
        this.loadAffiliations();
     }

    private loadAffiliations() {
        this.affiliations = new Array<Affiliation>();
        this.readService.get().toPromise().then((affiliations: Affiliation[]) => {
            for (let i:number = 0; i < affiliations.length; i++) {
                let affiliation:Affiliation = affiliations[i];
                this.affiliations.push(affiliation);
            }
        });
    }

    private showCrudDialog(affiliation:Affiliation, mode:string) {
        this.actionMode = mode;
        if (mode === "New") {
            this.selectedAffiliation = new Affiliation();
            this.selectedAffiliation.Description = '';
            this.selectedAffiliation.Name = '';
            this.selectedAffiliation.id = -1;
        } else {
            this.selectedAffiliation = affiliation;
        }
        this.displayDialog = true;
    }

    private cancel() {
        this.displayDialog = false;
    }

    private delete() {
        if (this.selectedAffiliation.id > 0) {
            this.adminService.delete(this.selectedAffiliation.id).toPromise().then((result:boolean) => {
                if (result) {
                    alert ("Successfully deleted affiliation.");
                    this.loadAffiliations();
                    this.displayDialog = false;
                } else {
                    alert ("Affiliation not deleted.");
                }
            })
        }
    }

    private save() {
        if (this.actionMode === "New") {
            if (this.validAffiliation(this.selectedAffiliation)) {
                this.adminService.create(this.selectedAffiliation).toPromise().then((id:number) => {
                    alert ("Created affiliation (" + id.toString() + ").");
                    this.loadAffiliations();
                    this.displayDialog = false;
                });
            } else {
                alert ("The affiliation is invalid.");
            }
        } else {
            this.update();
        }
    }

    private update() {
        if (this.validAffiliation(this.selectedAffiliation)) {
            this.adminService.update(this.selectedAffiliation).toPromise().then((result:any) => {
                alert ("Affiliation updated successfully.");
                this.loadAffiliations();
                this.displayDialog = false;
            });
        } else {
            alert ("The affiliation is invalid.");
        }
    }

    private validAffiliation (affiliation:Affiliation):boolean {
        let result = true;
        if (affiliation === null || affiliation === undefined) {
            result = false;
        } else if (affiliation.Name.trim().length === 0 || affiliation.Description.trim().length === 0) {
            result = false;
        }
        return result;
    }

}