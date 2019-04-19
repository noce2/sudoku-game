import { expect } from "chai"

import { Grid } from "../../generateSudokuGrid/grid";
import { test } from "mocha";

describe("Sudoku Grid", () => {
    it("should be initialised with 9 rows and 9 columns", () => {
        const testGrid: Grid = new Grid();
        expect(testGrid.noOfColumns).equals(9);
        expect(testGrid.noOfRows).equals(9);
    });

    it("should be able to set and retrieve a valid value in a given cell", () => {
        const testGrid: Grid = new Grid();
        const numberToSet = 3;
        const rowPosition = 1;
        const columnPosition = 1;
        testGrid.setCellValue(rowPosition,columnPosition,3);
        expect(testGrid.getCellValue(rowPosition, columnPosition))
            .equals(numberToSet);
    });
})