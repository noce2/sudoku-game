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
            this.grid[i] = (new Array(this.noOfColumns));
            for(let j = 0; j < this.noOfRows; j++) {
                this.grid[i][j] = new Cell();
            }
        }
    }

    /**
     * setCellValue
     * 
     * This method is used to set the cell values in the grid
     * 
     * @param rowPosition - The row position for the number on the grid. Index starts from 1.
     * @param columnPosition - The column position for the number on the grid. Index starts from 1.
     * @param valueToSet - The number to set the grid cell to
     */
    public setCellValue(rowPosition: number, columnPosition: number, valueToSet: number) {
        if((rowPosition > 0 && rowPosition < 10) && 
        (columnPosition > 0 && columnPosition < 10)) {
            if (!this.checkIfAnyCollisions(rowPosition, columnPosition, valueToSet)) {
                (this.grid[rowPosition-1][columnPosition-1]).entry = valueToSet;
            } else {
                throw new Error("attempting to set a value that already exists")
            } 
        } else {
            throw new Error("attempting to set a row or column out of bounds")
        }
    }

    /**
     * getCellValue
     * 
     * This method is used to get the cell values from the grid
     * 
     * @param rowPosition - The row position for the number on the grid. Index starts from 1.
     * @param columnPosition - The column position for the number on the grid. Index starts from 1.
     */
    public getCellValue(rowPosition: number, columnPosition: number): SudokuNumber {
        if((rowPosition > 0 && rowPosition < 10) && 
        (columnPosition > 0 && columnPosition < 10)) {
            return this.grid[rowPosition-1][columnPosition-1].entry;
        }

        throw new Error("attempting to get a row or column out of bounds")
    }

    /**
     * Checks if the supplied number exists in the row of its target position
     * 
     * @param rowPosition - The row position for the number on the grid. Index starts from 1.
     * @param valueToSet - The number to set the grid cell to
     * @returns true indicating the supplied number exists, false otherwise
     * 
     */
    private checkIfNumberExistsInRow(rowPosition: number, valueToSet: number): boolean {
        const arrayOfDefinedRowMembers = this.grid[rowPosition - 1]
            .reduce((arrOfMembers, current, index, row) => {
                if(current.entry) {
                    return arrOfMembers.concat(current.entry)
                }
                return arrOfMembers;
            }, []);

        const setOfRowIntegers = new Set(arrayOfDefinedRowMembers);

        return setOfRowIntegers.has(valueToSet);
    }

    /**
     * Checks if the supplied number exists in the row of its target position
     * 
     * @param columnPosition - The column position for the number on the grid. Index starts from 1.
     * @param valueToSet - The number to set the grid cell to
     * @returns true indicating the supplied number exists, false otherwise
     * 
     */
    private checkIfNumberExistsInColumn(columnPosition: number, valueToSet: number): boolean {
        const arrOfColumnNumbers: SudokuNumber[] = this.grid
            .reduce((arrOfMembers: SudokuNumber[], currentRow: Cell[]) => {
                if(currentRow[columnPosition-1].entry) {
                    return arrOfMembers.concat(currentRow[columnPosition -1].entry)
                }
                return arrOfMembers;
            }, []);

        const setOfRowIntegers: Set<SudokuNumber> = new Set(arrOfColumnNumbers);

        return setOfRowIntegers.has(valueToSet);
    }

    /**
     * Checks if placing the supplied number in its target position cause a collision
     * in its row, column or sub-grid.
     * 
     * @param rowPosition - The row position for the number on the grid. Index starts from 1.
     * @param columnPosition - The column position for the number on the grid. Index starts from 1.
     * @param valueToSet - The number to set the grid cell to
     * @returns true indicating a collision, false otherwise
     */
    private checkIfAnyCollisions(rowPosition: number, columnPosition: number, valueToSet: number): boolean {
        return this.checkIfNumberExistsInRow(rowPosition, valueToSet)
         || this.checkIfNumberExistsInColumn(columnPosition, valueToSet);
    }
}