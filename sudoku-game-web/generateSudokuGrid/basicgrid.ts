import { Cell } from "./cell";
import { SudokuNumber } from "./sudokunumber.enum";

/** 
 * Represents a sudoku grid
 */
export class BasicGrid {
    readonly noOfRows: number;
    readonly noOfColumns: number;
    readonly subGridSize: number;

     grid: Cell[][]

    /**
     * Creates a 9 x 9 empty sudoku grid 
     */
    constructor() {
        this.noOfRows = 9;
        this.noOfColumns = 9;
        this.subGridSize = Math.sqrt(this.noOfRows);
        this.grid = new Array(this.noOfRows);
        for (let i = 0; i < this.noOfRows; i++) {
            this.grid[i] = (new Array(this.noOfColumns));
            for (let j = 0; j < this.noOfRows; j++) {
                this.grid[i][j] = new Cell();
                this.grid[i][j].entry = 0;
                this.grid[i][j].row = i + 1;
                this.grid[i][j].column = j + 1;
                this.grid[i][j].block = (Math.floor(i / 3) * 3 + Math.floor(j / 3)) + 1;
                this.grid[i][j]._number = (j ) + i * 9;

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


    /**
     * getCellValue
     * 
     * This method is used to get the cell values from the grid
     * 
     * @param rowPosition - The row position for the number on the grid. Index starts from 1.
     * @param columnPosition - The column position for the number on the grid. Index starts from 1.
     */
    public getCellValue(rowPosition: number, columnPosition: number): SudokuNumber {
        if ((rowPosition > 0 && rowPosition < 10) &&
            (columnPosition > 0 && columnPosition < 10)) {
            return this.grid[rowPosition - 1][columnPosition - 1].entry;
        }

        throw new Error("attempting to get a row or column out of bounds")
    }
    public getCellBlock(rowPosition: number, columnPosition: number): SudokuNumber {
        if ((rowPosition > 0 && rowPosition < 10) &&
            (columnPosition > 0 && columnPosition < 10)) {
            return this.grid[rowPosition - 1][columnPosition - 1].block;
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
    public checkIfNumberCabBePutInRow(rowPosition: number, valueToSet: number): boolean {
        for (var i = 0; i <= 8; i++) {
            if (this.grid[rowPosition - 1][i].entry == valueToSet) {
                return false;
            }
        }
        return true;
    }


    /**
     * Checks if the supplied number exists in the row of its target position
     * 
     * @param columnPosition - The column position for the number on the grid. Index starts from 1.
     * @param valueToSet - The number to set the grid cell to
     * @returns true indicating the supplied number exists, false otherwise
     * 
     */
    public checkIfNumberCabBePutInColumn(columnPosition: number, valueToSet: number): boolean {
        for (var i = 0; i <= 8; i++) {
            if (this.grid[i][columnPosition - 1].entry == valueToSet) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if placing the supplied number in its target position causes a collision
     * in sub-grid.
     * 
     * @param rowPosition - The row position for the number on the grid. Index starts from 1.
     * @param columnPosition - The column position for the number on the grid. Index starts from 1.
     * @param valueToSet - The number to set the grid cell to
     * @returns true indicating a collision, false otherwise
     */
    public checkIfNumberCabBePutInBlock(blockPosition: number, valueToSet: number): boolean {
        for (var i = 0; i <= 8; i++) {
            for (var j = 0; j <= 8; j++) {
                if (this.grid[i][j].block == blockPosition && this.grid[i][j].entry == valueToSet) {
                    return false;
                }

            }
        }
        return true;
    }

    /**
     * Checks if placing the supplied number in its target position causes a collision
     * in its row, column or sub-grid.
     * 
     * @param rowPosition - The row position for the number on the grid. Index starts from 1.
     * @param columnPosition - The column position for the number on the grid. Index starts from 1.
     * @param valueToSet - The number to set the grid cell to
     * @returns false indicating a collision, true otherwise
     */
    public checkIfAnyCollisions(cell: Cell, valueToSet: number) {
        return this.checkIfNumberCabBePutInRow(cell.row, valueToSet) && this.checkIfNumberCabBePutInColumn(cell.column, valueToSet)
            && this.checkIfNumberCabBePutInBlock(cell.block, valueToSet)
    }

  
    public isCompleteRow(rowPosition: number) {
        var expected = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var rowTemp = new Array();
        for (var i = 0; i <= 8; i++) {
            rowTemp[i] = this.grid[rowPosition - 1][i].entry;
        }
        rowTemp.sort();
        return rowTemp.join() == expected.join();
    }
    public isCompleteColumn(columnPosition: number) {
        var expected = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var colTemp = new Array();
        for (var i = 0; i <= 8; i++) {
            colTemp[i] = this.grid[i][columnPosition - 1].entry;
        }
        colTemp.sort();
        return colTemp.join() == expected.join();
    }
    public isCompleteBlock(blockPosition: number) {
        var expected = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var blockTemp = new Array();
        for (var i = 0; i <= 8; i++) {
            for (var j = 0; j <= 8; j++) {
                if (this.grid[i][j].block == blockPosition) {
                    blockTemp.push( this.grid[i][j].entry);
                }

            }
        }
        blockTemp.sort();

        return blockTemp.join() == expected.join();
    }
//checks if the grid is actually solved
    public isCompleteGrid() {
        for (var i = 1; i <= 9; i++) {
            if (!(this.isCompleteRow(i) && this.isCompleteColumn(i) && this.isCompleteBlock(i))) {
                return false;
            }

        }
        return true;
    }
// given a cell returns an array of possible entries to that cell
    public determinePossibleValues(cell: Cell) {
        var possible = new Array();
        for (var i = 1; i <= 9; i++) {
            if (this.checkIfAnyCollisions(cell, i)) {
                possible.unshift(i);
            }
        }
        return possible;
    }
    // given a cell, returns a random possible value for tht cell
    public determineRandomPossibleValue(cell: Cell) {
        var randomPicked = Math.floor(Math.random() * this.determinePossibleValues(cell).length);
        return this.determinePossibleValues(cell)[randomPicked];
    }
  
  //given a grid, returns a 2d array of possible entries for every cell in the grid
    scanGridForUnique() {
        var possible = [];
        for (var i = 0; i <= 8; i++) {
            for (var j = 0; j <= 8; j++) {
                if (this.grid[i][j].entry == 0) {
                    possible[this.grid[i][j]._number] = new Array();
                    possible[this.grid[i][j]._number ] = this.determinePossibleValues(this.grid[i][j]);
                    if (possible[this.grid[i][j]._number].length == 0) {
                        return false;
                    }
                }
            }

        }
        return possible;
    }

    // given an array and a number, removes the number from the array
    public removeAttempt(attemptArray: [], number: number) {
        var newArray = new Array();
        for (var i = 0; i < attemptArray.length; i++) {
            if (attemptArray[i] != number) {
                newArray.unshift(attemptArray[i]);
            }
        }
        return newArray;
    }

    // given a two dimension array of possible values, returns the numberof a cell where there are the least possible numbers to choose from
    public nextRandom(possible: [][]) {
        var max = 9;
        var minChoices = 0;
        for (var i = 0; i <= 80; i++) {
            if (possible[i] != undefined) {
                if ((possible[i].length <= max) && (possible[i].length > 0)) {
                    max = possible[i].length;
                    minChoices = i;
                }
            }
        }
        return minChoices;
    }
  //given a grid, solves it and prints the number of iterations needed to the console. 
  //There is a lot of duplicate code, a method to update grid is needed and would make this function 20 lines shorter.
    public solveGrid() {
        var sudoku = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        var saved = new Array();
        var savedSudoku = new Array();
        var x = 0;
        var nextMove;
        var whatToTry;
        var attempt;
        while (!this.isCompleteGrid()) {
            x++;
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 9; j++) {
                    this.grid[i][j].entry = sudoku[(j) + i * 9];
                }
            }
            nextMove = this.scanGridForUnique();
            if (nextMove == false) {
                nextMove = saved.pop();
                sudoku = savedSudoku.pop();
                for (var i = 0; i < 9; i++) {
                    for (var j = 0; j < 9; j++) {
                        this.grid[i][j].entry = sudoku[(j) + i * 9];
                        
                    }
                }
            }
            whatToTry = this.nextRandom(nextMove);
            attempt = this.determineRandomPossibleValue(this.grid[Math.floor(whatToTry / 9)][whatToTry % 9]);
            if (nextMove[whatToTry].length > 1) {
                nextMove[whatToTry] = this.removeAttempt(nextMove[whatToTry], attempt);
                saved.push(nextMove.slice());
                savedSudoku.push(sudoku.slice());
                for (var k = 0; k < 9; k++) {
                    for (var l = 0; l < 9; l++) {
                        this.grid[k][l].entry = sudoku[(l) + k * 9];

                    }
                }

            }
            for (var k = 0; k < 9; k++) {
                for (var l = 0; l < 9; l++) {
                    this.grid[k][l].entry = sudoku[(l) + k * 9];

                }
            }

            sudoku[whatToTry] = attempt;
            for (var k = 0; k < 9; k++) {
                for (var l = 0; l < 9; l++) {
                    this.grid[k][l].entry = sudoku[(l) + k * 9];
                    if(x>120){
                        return false;
                    }

                }
            }
            
        }

        console.log("\n\nSolved in "+x+" steps");
    }
}


