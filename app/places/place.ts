export class Place {
    public id: number; 
    public Name: string;
    public Description: string;
    public Summary: string;
    public Affiliation: string;
    public Type: string;
    public HabHygId: number;
}

export class Planet extends Place {
    constructor () {
        super();
        this.Type = "Planet";
    }
}

export class City extends Place {
    public planet:Planet = new Planet();
    constructor () {
        super();
        this.Type = "City";
    }
}

export class Station extends Place {
    public planet:Planet = null;
    constructor () {
        super();
        this.Type = "Station";
    }
}