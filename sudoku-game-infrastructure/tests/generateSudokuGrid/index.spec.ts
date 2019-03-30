import { Context } from "@azure/functions";
import { expect } from "chai";
import { mock, when, anything, anyString } from "ts-mockito";

import httpTrigger from "../../generateSudokuGrid/index";
import { defaultContextObject } from "../defaultContextObject";

describe("generateSudokuGrid", () => {
    
    it("should return a json containing non-null grid", (done) => {
        let mockContextObject: Context = mock(defaultContextObject);
        when(mockContextObject.log(anyString)).thenCall(console.log);

        Promise.resolve(httpTrigger(mockContextObject, {}))
        .then(() => {
            expect(mockContextObject.res).to.be.not.null;
            expect(mockContextObject.res).to.have.property("grid");
            done();
        })
        .catch(err => done(err));
    })
})