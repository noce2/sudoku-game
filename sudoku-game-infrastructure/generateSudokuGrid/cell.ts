import { SudokuNumber } from "./sudokunumber.enum";

export class Cell {
    entry: SudokuNumber;
    possibleValues: SudokuNumber[];
}