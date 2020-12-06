import { GRID_WIDTH } from "./Config";

class LineCleaner {
    
    static updateRows(grid) {
        var filledLines = [];
        // count lines to clear
        for (var x = 0; x < grid.length; x++) {
            var line = 0;
            for (var col = 0; col < grid[x].length; col++) {
                if (grid[x][col] > 1) {
                    line++;
                } else {
                    break;
                }
            }
            if (line === GRID_WIDTH) {
                filledLines.push(x);
            }
           
        }
        for (let line of filledLines) {
            grid.splice(line, 1)
            grid.unshift(new Array(GRID_WIDTH).fill(0))
        }

        return filledLines.length;
    }
}

export default LineCleaner;