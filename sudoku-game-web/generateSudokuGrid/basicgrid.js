"use strict";
exports.__esModule = true;
var cell_1 = require("./cell");
/**
 * Represents a sudoku grid
 */
var BasicGrid = /** @class */ (function () {
    /**
     * Creates a 9 x 9 empty sudoku grid
     */
    function BasicGrid() {
        this.noOfRows = 9;
        this.noOfColumns = 9;
        this.subGridSize = Math.sqrt(this.noOfRows);
        this.grid = new Array(this.noOfRows);
        for (var i = 0; i < this.noOfRows; i++) {
            this.grid[i] = (new Array(this.noOfColumns));
            for (var j = 0; j < this.noOfRows; j++) {
                this.grid[i][j] = new cell_1.Cell();
                this.grid[i][j].entry = 0;
                this.grid[i][j].row = i + 1;
                this.grid[i][j].column = j + 1;
                this.grid[i][j].block = (Math.floor(i / 3) * 3 + Math.floor(j / 3)) + 1;
                this.grid[i][j]._number = (j) + i * 9;
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
    BasicGrid.prototype.getCellValue = function (rowPosition, columnPosition) {
        if ((rowPosition > 0 && rowPosition < 10) &&
            (columnPosition > 0 && columnPosition < 10)) {
            return this.grid[rowPosition - 1][columnPosition - 1].entry;
        }
        throw new Error("attempting to get a row or column out of bounds");
    };
    BasicGrid.prototype.getCellBlock = function (rowPosition, columnPosition) {
        if ((rowPosition > 0 && rowPosition < 10) &&
            (columnPosition > 0 && columnPosition < 10)) {
            return this.grid[rowPosition - 1][columnPosition - 1].block;
        }
        throw new Error("attempting to get a row or column out of bounds");
    };
    /**
     * Checks if the supplied number exists in the row of its target position
     *
     * @param rowPosition - The row position for the number on the grid. Index starts from 1.
     * @param valueToSet - The number to set the grid cell to
     * @returns true indicating the supplied number exists, false otherwise
     *
     */
    BasicGrid.prototype.checkIfNumberCabBePutInRow = function (rowPosition, valueToSet) {
        for (var i = 0; i <= 8; i++) {
            if (this.grid[rowPosition - 1][i].entry == valueToSet) {
                return false;
            }
        }
        return true;
    };
    /**
     * Checks if the supplied number exists in the row of its target position
     *
     * @param columnPosition - The column position for the number on the grid. Index starts from 1.
     * @param valueToSet - The number to set the grid cell to
     * @returns true indicating the supplied number exists, false otherwise
     *
     */
    BasicGrid.prototype.checkIfNumberCabBePutInColumn = function (columnPosition, valueToSet) {
        for (var i = 0; i <= 8; i++) {
            if (this.grid[i][columnPosition - 1].entry == valueToSet) {
                return false;
            }
        }
        return true;
    };
    /**
     * Checks if placing the supplied number in its target position causes a collision
     * in sub-grid.
     *
     * @param rowPosition - The row position for the number on the grid. Index starts from 1.
     * @param columnPosition - The column position for the number on the grid. Index starts from 1.
     * @param valueToSet - The number to set the grid cell to
     * @returns true indicating a collision, false otherwise
     */
    BasicGrid.prototype.checkIfNumberCabBePutInBlock = function (blockPosition, valueToSet) {
        for (var i = 0; i <= 8; i++) {
            for (var j = 0; j <= 8; j++) {
                if (this.grid[i][j].block == blockPosition && this.grid[i][j].entry == valueToSet) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * Checks if placing the supplied number in its target position causes a collision
     * in its row, column or sub-grid.
     *
     * @param rowPosition - The row position for the number on the grid. Index starts from 1.
     * @param columnPosition - The column position for the number on the grid. Index starts from 1.
     * @param valueToSet - The number to set the grid cell to
     * @returns true indicating a collision, false otherwise
     */
    BasicGrid.prototype.checkIfAnyCollisions = function (cell, valueToSet) {
        return this.checkIfNumberCabBePutInRow(cell.row, valueToSet) && this.checkIfNumberCabBePutInColumn(cell.column, valueToSet)
            && this.checkIfNumberCabBePutInBlock(cell.block, valueToSet);
    };
    BasicGrid.prototype.isCompleteRow = function (rowPosition) {
        var expected = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var rowTemp = new Array();
        for (var i = 0; i <= 8; i++) {
            rowTemp[i] = this.grid[rowPosition - 1][i].entry;
        }
        rowTemp.sort();
        return rowTemp.join() == expected.join();
    };
    BasicGrid.prototype.isCompleteColumn = function (columnPosition) {
        var expected = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var colTemp = new Array();
        for (var i = 0; i <= 8; i++) {
            colTemp[i] = this.grid[i][columnPosition - 1].entry;
        }
        colTemp.sort();
        return colTemp.join() == expected.join();
    };
    BasicGrid.prototype.isCompleteBlock = function (blockPosition) {
        var expected = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
        var blockTemp = new Array();
        for (var i = 0; i <= 8; i++) {
            for (var j = 0; j <= 8; j++) {
                if (this.grid[i][j].block == blockPosition) {
                    blockTemp.push(this.grid[i][j].entry);
                }
            }
        }
        blockTemp.sort();
        return blockTemp.join() == expected.join();
    };
    BasicGrid.prototype.isCompleteGrid = function () {
        for (var i = 1; i <= 9; i++) {
            if (!(this.isCompleteRow(i) && this.isCompleteColumn(i) && this.isCompleteBlock(i))) {
                return false;
            }
        }
        return true;
    };
    BasicGrid.prototype.determinePossibleValues = function (cell) {
        var possible = new Array();
        for (var i = 1; i <= 9; i++) {
            if (this.checkIfAnyCollisions(cell, i)) {
                possible.unshift(i);
            }
        }
        return possible;
    };
    // possible is an array
    BasicGrid.prototype.determineRandomPossibleValue = function (cell) {
        var randomPicked = Math.floor(Math.random() * this.determinePossibleValues(cell).length);
        return this.determinePossibleValues(cell)[randomPicked];
    };
    BasicGrid.prototype.scanGridForUnique = function () {
        var possible = [];
        for (var i = 0; i <= 8; i++) {
            for (var j = 0; j <= 8; j++) {
                if (this.grid[i][j].entry == 0) {
                    possible[this.grid[i][j]._number] = new Array();
                    possible[this.grid[i][j]._number] = this.determinePossibleValues(this.grid[i][j]);
                    if (possible[this.grid[i][j]._number].length == 0) {
                        return false;
                    }
                }
            }
        }
        return possible;
    };
    // given an array and a number, removes the number from the array
    BasicGrid.prototype.removeAttempt = function (attemptArray, number) {
        var newArray = new Array();
        for (var i = 0; i < attemptArray.length; i++) {
            if (attemptArray[i] != number) {
                newArray.unshift(attemptArray[i]);
            }
        }
        return newArray;
    };
    // given a two dimension array of possible values, returns the index of a cell where there are the less possible numbers to choose from
    BasicGrid.prototype.nextRandom = function (possible) {
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
    };
    BasicGrid.prototype.solveGrid = function () {
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
                    if (x > 120) {
                        return false;
                    }
                }
            }
        }
        console.log("\n\nSolved in " + x + " steps");
    };
    return BasicGrid;
}());
exports.BasicGrid = BasicGrid;
