import { expect } from "chai"

import { SudokuNumber } from "../../generateSudokuGrid/sudokunumber.enum";
import { Cell } from "../../generateSudokuGrid/cell";

describe("Cell", () => {
    it("should be initialised with an empty entry", () => {
        const testCell: Cell = new Cell();
        expect(testCell.entry).to.be.undefined;
    })
    
    it("should allow any number between 1 and 9 to be set", () => {
        throw(new Error("no test written yet"));
    })
})