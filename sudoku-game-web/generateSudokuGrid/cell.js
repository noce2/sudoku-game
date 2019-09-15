"use strict";
exports.__esModule = true;
var sudokunumber_enum_1 = require("./sudokunumber.enum");
var Cell = /** @class */ (function () {
    function Cell() {
    }
    Object.defineProperty(Cell.prototype, "entry", {
        get: function () {
            return this._entry;
        },
        set: function (number) {
            // the below only works because TypeScript allows reverse mappings
            if (sudokunumber_enum_1.SudokuNumber[number]) {
                this._entry = number;
            }
            else {
                throw new Error("invalid sudoku number");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "row", {
        get: function () {
            return this._row;
        },
        set: function (number) {
            if (sudokunumber_enum_1.SudokuNumber[number]) {
                this._row = number;
            }
            else {
                throw new Error("invalid sudoku number");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "column", {
        get: function () {
            return this._column;
        },
        set: function (number) {
            if (sudokunumber_enum_1.SudokuNumber[number]) {
                this._column = number;
            }
            else {
                throw new Error("invalid sudoku number");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "block", {
        get: function () {
            return this._block;
        },
        set: function (number) {
            if (sudokunumber_enum_1.SudokuNumber[number]) {
                this._block = number;
            }
            else {
                throw new Error("invalid sudoku number");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Cell;
}());
exports.Cell = Cell;
