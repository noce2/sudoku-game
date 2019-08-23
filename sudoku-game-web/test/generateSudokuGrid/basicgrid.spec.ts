import { expect } from "chai"

import { BasicGrid } from "../../generateSudokuGrid/basicgrid";

describe("Sudoku BasicGrid", () => {
    it("should be initialised with 9 rows and 9 columns", () => {
        const testBasicGrid: BasicGrid = new BasicGrid();
        expect(testBasicGrid.noOfColumns).equals(9);
        expect(testBasicGrid.noOfRows).equals(9);
    });

    it("should be able to set and retrieve a valid value in a given cell", () => {
        const testBasicGrid: BasicGrid = new BasicGrid();
        const numberToSet = 3;
        const rowPosition = 1;
        const columnPosition = 1;
        testBasicGrid.setCellValue(rowPosition,columnPosition,numberToSet);
        expect(testBasicGrid.getCellValue(rowPosition, columnPosition))
            .equals(numberToSet);
    });

    it("should throw an exception if a value is set to a position that doesn't exist", () => {
        const testBasicGrid: BasicGrid = new BasicGrid();
        const numberToSet = 3;
        const rowPosition = 10;
        const columnPosition = 10;
        
        expect(() => testBasicGrid.setCellValue(rowPosition,columnPosition,numberToSet))
            .to.throw(/out of bounds/);
    });

    it("should throw an exception if the user tries to retrieve a value from a nonexistent position", () => {
        const testBasicGrid: BasicGrid = new BasicGrid();
        const rowPosition = -1;
        const columnPosition = -1;
        
        expect(() => testBasicGrid.getCellValue(rowPosition,columnPosition))
            .to.throw(/out of bounds/);
    });

    it("should correctly set and retrieve non-colliding values in a row", () => {
        const testBasicGrid: BasicGrid = new BasicGrid();
        const firstRowPosition = 1;
        const firstColumnPosition = 1;
        const firstValue = 2;

        testBasicGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 1;
        const secondColumnPosition = 6;
        const secondValue = 7;

        testBasicGrid.setCellValue(secondRowPosition, secondColumnPosition, secondValue);
        
        expect(testBasicGrid.getCellValue(firstRowPosition,firstColumnPosition))
            .to.eql(firstValue);

        expect(testBasicGrid.getCellValue(secondRowPosition,secondColumnPosition))
            .to.eql(secondValue);
    });

    it("should throw an exception if the user tries to set colliding values in a row", () => {
        const testBasicGrid: BasicGrid = new BasicGrid();
        const firstRowPosition = 1;
        const firstColumnPosition = 1;
        const firstValue = 2;

        testBasicGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 1;
        const secondColumnPosition = 6;
        const secondValue = 2;

        expect(() => testBasicGrid.setCellValue(secondRowPosition, secondColumnPosition,
            secondValue))
            .to.throw(/value (.*) already exists/);
    });

    it("should correctly set and retrieve non-colliding values in a column", () => {
        const testBasicGrid: BasicGrid = new BasicGrid();
        const firstRowPosition = 1;
        const firstColumnPosition = 6;
        const firstValue = 2;

        testBasicGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 6;
        const secondColumnPosition = 6;
        const secondValue = 7;

        testBasicGrid.setCellValue(secondRowPosition, secondColumnPosition, secondValue);
        
        expect(testBasicGrid.getCellValue(firstRowPosition,firstColumnPosition))
            .to.eql(firstValue);

        expect(testBasicGrid.getCellValue(secondRowPosition,secondColumnPosition))
            .to.eql(secondValue);
    });

    it("should throw an exception if the user tries to set colliding values in a column", () => {
        const testBasicGrid: BasicGrid = new BasicGrid();
        const firstRowPosition = 1;
        const firstColumnPosition = 1;
        const firstValue = 2;

        testBasicGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 6;
        const secondColumnPosition = 1;
        const secondValue = 2;

        expect(() => testBasicGrid.setCellValue(secondRowPosition, secondColumnPosition,
            secondValue))
            .to.throw(/value (.*) already exists/);
    });

    it("should correctly set and retrieve non-colliding values in a sub-grid", () => {
        const testBasicGrid: BasicGrid = new BasicGrid();
        const firstRowPosition = 1;
        const firstColumnPosition = 1;
        const firstValue = 2;

        testBasicGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 2;
        const secondColumnPosition = 3;
        const secondValue = 7;

        testBasicGrid.setCellValue(secondRowPosition, secondColumnPosition, secondValue);
        
        expect(testBasicGrid.getCellValue(firstRowPosition,firstColumnPosition))
            .to.eql(firstValue);

        expect(testBasicGrid.getCellValue(secondRowPosition,secondColumnPosition))
            .to.eql(secondValue);
    });

    it("should throw an exception if the user tries to set colliding values in a sub-BasicGrid", () => {
        const testBasicGrid: BasicGrid = new BasicGrid();
        const firstRowPosition = 1;
        const firstColumnPosition = 1;
        const firstValue = 2;

        testBasicGrid.setCellValue(firstRowPosition, firstColumnPosition, firstValue);

        const secondRowPosition = 2;
        const secondColumnPosition = 3;
        const secondValue = 2;

        expect(() => testBasicGrid.setCellValue(secondRowPosition, secondColumnPosition,
            secondValue))
            .to.throw(/value (.*) already exists/);

        const thirdRowPosition = 6;
        const thirdColumnPosition = 6;
        const thirdValue = 2;

        testBasicGrid.setCellValue(thirdRowPosition, thirdColumnPosition, thirdValue);

        const fourthRowPosition = 4;
        const fourthColumnPosition = 5;
        const fourthValue = 2;

        expect(() => testBasicGrid.setCellValue(fourthRowPosition, fourthColumnPosition,
            fourthValue))
            .to.throw(/value (.*) already exists/);

        const fifthRowPosition = 8;
        const fifthColumnPosition = 8;
        const fifthValue = 2;

        testBasicGrid.setCellValue(fifthRowPosition, fifthColumnPosition, fifthValue);

        const sixthRowPosition = 8;
        const sixthColumnPosition = 9;
        const sixthValue = 2;

        expect(() => testBasicGrid.setCellValue(sixthRowPosition, sixthColumnPosition,
            sixthValue))
            .to.throw(/value (.*) already exists/);
    });
})