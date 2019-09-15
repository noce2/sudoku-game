"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var cell_1 = require("./cell");
var PuzzleGenerationCell = /** @class */ (function (_super) {
    __extends(PuzzleGenerationCell, _super);
    function PuzzleGenerationCell(arrOfPossibles) {
        var _this = _super.call(this) || this;
        _this._possibleEntries = new Set(arrOfPossibles);
        return _this;
    }
    PuzzleGenerationCell.prototype.hasAsPossibleEntry = function (memberToCheckFor) {
        return this._possibleEntries.has(memberToCheckFor);
    };
    return PuzzleGenerationCell;
}(cell_1.Cell));
exports.PuzzleGenerationCell = PuzzleGenerationCell;
