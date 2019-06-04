import { expect } from "chai"

import { SudokuNumber } from "../../generateSudokuGrid/sudokunumber.enum";
import { PuzzleGenerationCell } from "../../generateSudokuGrid/puzzlegenerationcell";

describe("PuzzleGenerationCell", () => {
    it("should initialise with a blank cell and a set of possible entries", () => {
        const possibleEntries = [1, 2];
        const testCell = new PuzzleGenerationCell(possibleEntries);

        expect(testCell.entry).to.be.undefined;
        expect(testCell.hasAsPossibleEntry(1)).to.be.true;
        expect(testCell.hasAsPossibleEntry(2)).to.be.true;
        expect(testCell.hasAsPossibleEntry(3)).to.be.false;
    })
})