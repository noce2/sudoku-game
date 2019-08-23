import { expect } from "chai"

import { PuzzleGeneratorService } from "../../generateSudokuGrid/puzzlegenerator.service";

describe("Puzzle Generator Service", () => {
    it(`should generate an initial grid that is empty but contains all possibilities of 
    entries in every cell`, () => {
        const testService: PuzzleGeneratorService = new PuzzleGeneratorService();
        const initialGrid = testService.generateInitialGrid();
    });
})