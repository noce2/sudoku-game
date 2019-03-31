import { SudokuNumber } from "./sudokunumber.enum";

export class Cell {
    _entry: SudokuNumber;

    get entry():SudokuNumber {
        return this._entry;
    }

    set entry(number: SudokuNumber) {
        // the below only works because TypeScript allows reverse mappings
        if(SudokuNumber[number]){
            this._entry = number;
        } else {
            throw new Error("invalid sudoku number");
        }
    }
}