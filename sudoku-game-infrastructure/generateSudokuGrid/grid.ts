import { Cell } from "./cell";
import { SudokuNumber } from "./sudokunumber.enum";

/** 
 * Represents a sudoku grid
 */
export class Grid {
    readonly noOfRows: number;
    readonly noOfColumns: number;

    private grid: Cell[][]

    /**
     * Creates a 9 x 9 sudoku grid
     */
    constructor() {
        this.noOfRows = 9;
        this.noOfColumns = 9;
        this.grid = new Array(this.noOfRows);
        for(let i = 0; i < this.noOfRows; i++) {
            this.grid[i] = (new Array(this.noOfColumns)).fill(new Cell());
        }
    }

    /**
     * setCellValue
     * 
     * This method is used to set the cell values in the grid
     * 
     * @param rowPosition - The row position for the number on the grid
     * @param columnPosition - The column position for the number on the grid
     * @param valueToSet - The number to set the grid cell to
     */
    public setCellValue(rowPosition: number, columnPosition: number, valueToSet: number) {
        if((rowPosition > 0 && rowPosition < 10) && 
        (columnPosition > 0 && columnPosition < 10)) {
            (this.grid[rowPosition-1][columnPosition-1]).entry = valueToSet;
        } else {
            throw new Error("attempting to set a row or column out of bounds")
        }
    }

    /**
     * getCellValue
     * 
     * This method is used to get the cell values from the grid
     * 
     * @param rowPosition - The row position for the number on the grid
     * @param columnPosition - The column position for the number on the grid
     */
    public getCellValue(rowPosition: number, columnPosition: number): SudokuNumber {
        if((rowPosition > 0 && rowPosition < 10) && 
        (columnPosition > 0 && columnPosition < 10)) {
            return this.grid[rowPosition-1][columnPosition-1].entry;
        }

        throw new Error("attempting to get a row or column out of bounds")
    }
}