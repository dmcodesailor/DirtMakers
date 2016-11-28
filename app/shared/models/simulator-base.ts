import { SimulationMessage }        from '../models/simulation-message';
import { SimulationEventEmitter }   from '../events/simulation-event';

export abstract class SimulatorBase {
    public interval:number = 5000; // milliseconds
    public category:string;
    public name:string;
    public messages:SimulationMessage[];

    protected simInterval;
    protected simEvent:SimulationEventEmitter = new SimulationEventEmitter();

    constructor() {
        this.init(null);
    }

    protected init(messageTemplates:string[]) {
        messageTemplates.forEach((val, idx, arr) => {

        });
    }

    public start(){
        this.simInterval = setInterval(() => this.simulate(), this.interval);
    };
    
    public stop(){
        clearInterval(this.simInterval);
    };

    protected simulate() {
        let msg:SimulationMessage = new SimulationMessage();
        this.simEvent.raise(msg);
    }

    /**
     * Template formats:
     * {type:number,min:0,max:5}
     * {type:number,values:[]}
     * {type:string,min:0,max:5}
     * {type:string,values:[]}
     * {type:date,min:x,max:y}
     * {type:date,values:[]}
     * {type:bool}
     * 
     * @protected
     * @param {string} template
     * @returns {SimulationMessage}
     * 
     * @memberOf ISimulator
     */
    protected messageFromTemplate(template:string):SimulationMessage {
        let result = new SimulationMessage();
        result.message = this.replaceTokens(template);
        return result;
    }

    /**
     * 
     * 
     * @protected
     * @param {string} template
     * @returns {string}
     * 
     * @memberOf ISimulator
     */
    public replaceTokens(template:string):string {
        let result:string = template;
        let paramStr:string;
        let paramObj:Object;
        let currentIndexLeftBrace = 0;
        let currentIndexRightBrace = 0;

        let tokens:string[] = [];

        // Extract all tokens.
        tokens = this.extractTokens(template);
        
        // Build the replacing string for each token.
        // Process each token in turn and create the 
        // replacement string based on the token parameters.
        tokens.forEach((value, index, array) => {
            let token = this.parseToken(value);
            // At this point min and max are both set.
            let idx = this.Random(token.min, token.max);           
            let replacementVal:any = this.generateValueForToken(token, idx);
            // Replace each token in the original string
            // with the replacement value.
            result = result.replace(value, replacementVal);

        });

        // while (currentIndexLeftBrace < template.length) {
        //     currentIndexLeftBrace = template.indexOf("{", currentIndexLeftBrace);
        //     if (currentIndexLeftBrace > 0) {
        //         currentIndexRightBrace = template.indexOf("}", currentIndexLeftBrace);
        //         if (currentIndexRightBrace > currentIndexLeftBrace) {
        //             paramStr = template.substring(currentIndexLeftBrace, currentIndexRightBrace);
        //             paramObj = JSON.parse(paramStr);
        //             if (paramObj.hasOwnProperty("values")) {
                        
        //             } else {

        //             }
        //         }
        //     }
        // }
        return result;
    }

    /**
     * 
     * 
     * @protected
     * @param {string} template
     * @returns {string[]}
     * 
     * @memberOf ISimulator
     */
    public extractTokens(template:string):string[] {
        let result:string[] = [];
        let startToken:string = '{';
        let endToken:string = "}";
        let insideParameter:boolean = false;
        let buffer:string[] = [];
        
        template.split('').forEach((val, idx) => {
            if (val === startToken) {
                insideParameter = true;
                buffer = new Array<string>();
                buffer.push(val);
            }
            if (insideParameter === true) {
                buffer.push(val);
            }
            if (val === endToken) {
                insideParameter = false;
                buffer.push(val);
                result.push(buffer.toString());
            }
        });
        return result;
    }

    /**
     * 
     * 
     * @protected
     * @param {string} token
     * @returns {*}
     * 
     * @memberOf ISimulator
     */
    protected parseToken (token:string):any {
        let result:any;
        // Each tokenized item is in JSON format.
        // Cast to a JSON object.
        let tokenType:string = '';
        let tokenVals:any[] = [];
        let tokenMin:any;
        let tokenMax:any;
        let jsonToken:any = JSON.parse(token);

        // 'type' is required/guaranteed.
        if (jsonToken.hasOwnProperty('type')) {
            tokenType = jsonToken.type;
        }

        // Extract the values or settings for
        // randomly generating values.
        if (jsonToken.hasOwnProperty('values')) {
            tokenVals = jsonToken.values;
            tokenMin = 0;
            tokenMax = tokenVals.length - 1;
            
        } else {
            if (jsonToken.hasOwnProperty('min')) {
                tokenMin = jsonToken.min;
            } else {
                tokenMin = Number.MIN_VALUE;
            }

            if (jsonToken.hasOwnProperty('max')) {
                tokenMax = jsonToken.max;
            } else {
                tokenMax = Number.MAX_VALUE;
            }
        }
        return result;
    }

    /**
     * 
     * 
     * @protected
     * @param {*} token
     * @param {number} idx
     * @returns {*}
     * 
     * @memberOf ISimulator
     */
    protected generateValueForToken (token:any, idx:number):any {
        let result:any;
            // Perform data generation as a function of
            // the specified type.
            switch(token.type) {
                case 'string':
                    result = token.values[idx];
                break;
                case 'number':
                    result = idx;
                break;
                case 'date':
                    if (token.values.length === 0) {
                        result = this.randomDate(new Date('01/01/1970'), new Date('12/31/2148'), 0, 23);
                    } else {
                        result = token.values[idx];
                    }
                break;
                case 'bool':
                    // Regenerate a random number.  
                    // 0 = false; !0 = true;
                    result = true;
                    idx = this.Random(0, 1);
                    if (idx === 0) {
                        result = false;
                    }
                break;
                default:
                    // Do NO OP
                break;
            }
        return result;
    }

    /**
     * 
     * 
     * @param {number} min
     * @param {number} max
     * @returns {number}
     * 
     * @memberOf ISimulator
     */
    public Random(min: number, max: number): number {
        return (Math.random() * (max - min + 1) | 0) + min;
    }   

    /**
     * 
     * 
     * @param {Date} start
     * @param {Date} end
     * @param {number} startHour
     * @param {number} endHour
     * @returns
     * 
     * @memberOf ISimulator
     */
    public randomDate(start:Date, end:Date, startHour:number, endHour:number) {
        let date = new Date(+start + Math.random() * (+end - +start));
        let hour = startHour + Math.random() * (endHour - startHour) | 0;
        date.setHours(hour);
        return date;
    }
}
export class EngineeringSimulator extends SimulatorBase {
    constructor() {
        super();
    }
}
