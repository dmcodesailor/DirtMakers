export class SimulationMessage {
    public useCount:number = 0;
    public message:string;
    public weight:number;
    public category:string; // info, warning, alert
    public department:string;
    public division:string;
}