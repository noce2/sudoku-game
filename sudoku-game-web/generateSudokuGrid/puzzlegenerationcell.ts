import { SudokuNumber } from "./sudokunumber.enum";
import { Cell } from "./cell";

export class PuzzleGenerationCell extends Cell{
    private _possibleEntries: Set<SudokuNumber>;

    constructor (arrOfPossibles: SudokuNumber[]) {
        super();
        this._possibleEntries = new Set(arrOfPossibles);

    }

    hasAsPossibleEntry(memberToCheckFor: SudokuNumber): boolean {
        return this._possibleEntries.has(memberToCheckFor);
    }
}