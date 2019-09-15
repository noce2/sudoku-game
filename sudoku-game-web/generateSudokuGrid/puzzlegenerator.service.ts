import { BasicGrid } from "./basicgrid";

// TODO: Add a singleton decorator to ensure only one of this exists
export class PuzzleGeneratorService {
    public getRandomindices() {
        var randArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
            40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
            50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
            60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
            70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
            80];
        var array = new Array();
      
      //Arbitrarily gets unique numbers from 0-80 into an array. in the future will want to add functionality to guarantee the number of blank spots 
      //in the puzzle
        for (var i = 0; i < 35; i++) {
            var randomPicked = Math.floor(Math.random() * randArr.length);
            if (!array.includes(randomPicked)) {
                array.push(randomPicked);
            }
        }
        return array;
    }
  //This function returns a grid object containing a 2d array of cell objects with up to 35 cell entry attributes of zero(representing blank spaces on the puzzle)
    public getEasyPuzzle() {
      //use better variable names here. 
        var x = new BasicGrid();
      
        x.solveGrid();
        var array: number[] = this.getRandomindices();


        for (var i=0;i<array.length;i++){
            x.grid[Math.floor(array[i] / 9)][array[i] % 9].entry=0;
        }
       
      
        return x;
    }


}

