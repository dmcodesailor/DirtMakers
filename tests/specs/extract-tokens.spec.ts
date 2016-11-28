import { SimulatorBase, EngineeringSimulator }                    from '../../app/shared/models/simulator-base';

describe('extract tokens tests', () => {

    it ('test', () => {
        expect(true).toBe(true);
    });

    let sampleTokenizedString:string = "This is a {type:string, values:[sample, example]} tokenized string.";

    // token extraction
    it('extractTokens-singleToken-expectSuccess', () => {
        let svc = new EngineeringSimulator();
        let tokens = svc.extractTokens(sampleTokenizedString)
        expect(tokens.length).toBe(1); 
    });

    // it('extractTokens-singleTokenOfTypeString-expectSuccess', () => {
    //     let svc = new EngineeringSimulator();
    //     let tokens = svc.extractTokens(sampleTokenizedString)
    //     expect(tokens.length).toBe(1);
    //     let jsonObj:any = JSON.parse(tokens[0]); 
    //     expect(jsonObj.type).toBe('string');
    // });

});