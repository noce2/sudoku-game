import { Context, ExecutionContext, BindingDefinition, Logger, HttpRequest } from "@azure/functions";

export class defaultContextObject implements Context {
    invocationId: string;
    executionContext: ExecutionContext;
    bindings: { [key: string]: any; };
    bindingData: { [key: string]: any; };
    bindingDefinitions: BindingDefinition[];
    log: Logger;
    done(err?: string | Error, result?: any): void {
        throw new Error("Method not implemented.");
    }
    req?: HttpRequest;
    res?: { [key: string]: any; };
    
    constructor() {
        this.log = <Logger> function() {}
    }
}