import { SudokuNumber } from "./sudokunumber.enum";

export class Cell {
    private _entry: SudokuNumber;
    private _row: SudokuNumber;
    private _column: SudokuNumber;
    private _block: SudokuNumber;
    public _number: number;

    get entry(): SudokuNumber {
        return this._entry;
    }
    get row(): SudokuNumber {
        return this._row;
    }
    get column(): SudokuNumber {
        return this._column;
    }
    get block(): SudokuNumber {
        return this._block;
    }
    set row(number: SudokuNumber) {
        if (SudokuNumber[number]) {
            this._row = number;
        } else {
            throw new Error("invalid sudoku number");
        }
    }
    set column(number: SudokuNumber) {
        if (SudokuNumber[number]) {
            this._column = number;
        } else {
            throw new Error("invalid sudoku number");
        }
    }
    set block(number: SudokuNumber) {
        if (SudokuNumber[number]) {
            this._block = number;
        } else {
            throw new Error("invalid sudoku number");
        }
    }

    set entry(number: SudokuNumber) {
        // the below only works because TypeScript allows reverse mappings
        if (SudokuNumber[number]) {
            this._entry = number;
        } else {
            throw new Error("invalid sudoku number");
        }
    }
}