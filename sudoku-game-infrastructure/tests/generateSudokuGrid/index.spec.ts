import { Context } from "@azure/functions";
import { expect } from "chai";

import httpTrigger from "../../generateSudokuGrid/index";

describe("generateSudokuGrid", () => {
    let mockContextObject: Context;
    
    it("should return a json containing non-null grid", (done) => {
        httpTrigger(mockContextObject, {})
        expect(mockContextObject.res).to.be.not.null;
        done();
    })
})