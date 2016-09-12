export class DistanceConvert {
    public AstronomicalUnitsPerLightYear:number = 63241.0771
    public LightYearsPerParsec:number = 3.26;
    public KilometersPerLightYear:number = 9460730470000;
    public DaysPerYear:number = 365.25;

    /**
     * 
     */
    public AstronomicalUnitsToLightYears (aus:number) : number {
        let result: number = 0;
        result = aus/this.AstronomicalUnitsPerLightYear;
        return result;
    }

    public AstronomicalUnitsToParsecs (aus:number) : number {
        let result: number = 0;
        // First convert AUs to lightyears.
        result = this.AstronomicalUnitsToLightYears(aus);
        // Now convert lightyears to parsecs.
        result = result * this.LightYearsPerParsec;
        return result;
    }

    public AstronomicalUnitsToKilometers (aus:number) : number {
        let result:number = 0;
        // First convert AUs to lightyears.
        result = this.AstronomicalUnitsToLightYears(aus);
        // Now convert lightyears to kilometers.
        result = result * this.KilometersPerLightYear;
        return result;
    }

    public AstronomicalUnitsToLightDays (aus:number) : number {
        let result: number = 0;
        // First convert AUs to lightyears.
        result = this.AstronomicalUnitsToLightYears(aus);
        // Now convert lightyears to lightdays.
        result = result * this.DaysPerYear;
        return result;
    }

    /**
     * 
     */
    public LightyearsToAstronomicalUnits (lightyears:number):number {
        let result:number = -1;
        result = lightyears * this.AstronomicalUnitsPerLightYear;
        return result;
    }

    public LightyearsToParsecs (lightyears:number):number {
        let result:number = -1;
        result = lightyears / this.LightYearsPerParsec;
        return result;
    }

    public LightyearsToKilometers (lightyears:number):number {
        let result:number = -1;
        result = lightyears * this.KilometersPerLightYear;
        return result;
    }

    public LightyearsToLightdays (lightyears:number):number {
        let result:number = -1;
        result = lightyears * this.DaysPerYear;
        return result;
    }

    /**
     * 
     */
    public ParsecsToAstronomicalUnits (parsecs:number):number {
        let result = -1;
        // First convert parsecs to lightyears.
        result = parsecs * this.LightYearsPerParsec;
        // Now convert lightyears to AUs.
        result = result * this.AstronomicalUnitsPerLightYear;
        return result;
    }

    public ParsecsToLightYears (parsecs:number):number {
        let result:number = -1;
        result = parsecs * this.LightYearsPerParsec;
        return result;
    }

    public ParsecsToKilometers (parsecs:number):number {
        let result:number = -1;
        // First convert parsecs to lightyears.
        result = parsecs * this.LightYearsPerParsec;
        // Now convert lightyears to kilometers.
        result = result * this.KilometersPerLightYear;
        return result;
    }

    public ParsecsToLightdays (parsecs:number):number {
        let result:number = -1;
        // First convert parsecs to lightyears.
        result = parsecs * this.LightYearsPerParsec;
        // Now convert lightyears to kilometers.
        result = result * this.DaysPerYear;
        return result;
    }

}