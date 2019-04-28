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
        testGrid.setCellValue(rowPosition,columnPosition,numberToSet);
        expect(testGrid.getCellValue(rowPosition, columnPosition))
            .equals(numberToSet);
    });

    it("should throw an exception if a value is set to a position that doesn't exist", () => {
        const testGrid: Grid = new Grid();
        const numberToSet = 3;
        const rowPosition = 10;
        const columnPosition = 10;
        
        expect(() => testGrid.setCellValue(rowPosition,columnPosition,numberToSet))
            .to.throw(/out of bounds/);
    });

    it("should throw an exception if the user tries to retrieve a value from a nonexistent position", () => {
        const testGrid: Grid = new Grid();
        const rowPosition = -1;
        const columnPosition = -1;
        
        expect(() => testGrid.getCellValue(rowPosition,columnPosition))
            .to.throw(/out of bounds/);
    });

    it("should correctly set and retrieve non-colliding values in a row", () => {
        const testGrid: Grid = new Grid();
        const firstRowPosition = 1;
        const firstColumnPosition = 1;
        const firstValue = 2;

        testGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 1;
        const secondColumnPosition = 6;
        const secondValue = 7;

        testGrid.setCellValue(secondRowPosition, secondColumnPosition, secondValue);
        
        expect(testGrid.getCellValue(firstRowPosition,firstColumnPosition))
            .to.eql(firstValue);

        expect(testGrid.getCellValue(secondRowPosition,secondColumnPosition))
            .to.eql(secondValue);
    });

    it("should throw an exception if the user tries to set colliding values in a row", () => {
        const testGrid: Grid = new Grid();
        const firstRowPosition = 1;
        const firstColumnPosition = 1;
        const firstValue = 2;

        testGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 1;
        const secondColumnPosition = 6;
        const secondValue = 2;

        expect(() => testGrid.setCellValue(secondRowPosition, secondColumnPosition,
            secondValue))
            .to.throw(/value (.*) already exists/);
    });

    it("should correctly set and retrieve non-colliding values in a column", () => {
        const testGrid: Grid = new Grid();
        const firstRowPosition = 1;
        const firstColumnPosition = 6;
        const firstValue = 2;

        testGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 6;
        const secondColumnPosition = 6;
        const secondValue = 7;

        testGrid.setCellValue(secondRowPosition, secondColumnPosition, secondValue);
        
        expect(testGrid.getCellValue(firstRowPosition,firstColumnPosition))
            .to.eql(firstValue);

        expect(testGrid.getCellValue(secondRowPosition,secondColumnPosition))
            .to.eql(secondValue);
    });

    it("should throw an exception if the user tries to set colliding values in a column", () => {
        const testGrid: Grid = new Grid();
        const firstRowPosition = 1;
        const firstColumnPosition = 1;
        const firstValue = 2;

        testGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 6;
        const secondColumnPosition = 1;
        const secondValue = 2;

        expect(() => testGrid.setCellValue(secondRowPosition, secondColumnPosition,
            secondValue))
            .to.throw(/value (.*) already exists/);
    });

    it("should correctly set and retrieve non-colliding values in a sub-grid", () => {
        const testGrid: Grid = new Grid();
        const firstRowPosition = 1;
        const firstColumnPosition = 1;
        const firstValue = 2;

        testGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 2;
        const secondColumnPosition = 3;
        const secondValue = 7;

        testGrid.setCellValue(secondRowPosition, secondColumnPosition, secondValue);
        
        expect(testGrid.getCellValue(firstRowPosition,firstColumnPosition))
            .to.eql(firstValue);

        expect(testGrid.getCellValue(secondRowPosition,secondColumnPosition))
            .to.eql(secondValue);
    });

    it("should throw an exception if the user tries to set colliding values in a sub-grid", () => {
        const testGrid: Grid = new Grid();
        const firstRowPosition = 1;
        const firstColumnPosition = 1;
        const firstValue = 2;

        testGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 2;
        const secondColumnPosition = 3;
        const secondValue = 2;

        expect(() => testGrid.setCellValue(secondRowPosition, secondColumnPosition,
            secondValue))
            .to.throw(/value (.*) already exists/);
    });
})