import { expect } from "chai"

import { SudokuNumber } from "../../generateSudokuGrid/sudokunumber.enum";
import { Cell } from "../../generateSudokuGrid/cell";

describe("Cell", () => {
    it("should be initialised with an empty entry if no args supplied", () => {
        const testCell: Cell = new Cell();
        expect(testCell.entry).to.be.undefined;
    });
    
    it("should allow any integer between 1 and 9 to be set", () => {
        const testCell: Cell = new Cell();
        testCell.entry = 3;
        expect(testCell.entry).to.eql(3);
    });

    it("should not allow any integer outside 1 and 9 to be set", () => {
        const testCell: Cell = new Cell();
        
        expect(() => {testCell.entry = 0}).to.throw(/invalid sudoku number/);
        expect(() => {testCell.entry = -1}).to.throw(/invalid sudoku number/);
        expect(() => {testCell.entry = 2.2}).to.throw(/invalid sudoku number/);
    });

    it("should initialise a blank cell with a set of all possible sudoku numbers", () => {
        const testCell: Cell = new Cell();
        const expectedSet = new Set([1,2,3,4,5,6,7,8,9]);
        expect(testCell.possibleEntries).to.deep.equal(expectedSet);
    })
})