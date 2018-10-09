'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the cavityMap function below.
function cavityMap(grid) {
        for (var i = 1; i < grid.length - 1; i++) {
            for (var j = 1; j < grid[i].length - 1; j++) {
                var top = grid[i - 1][j];
                var bottom = grid[i + 1][j];
                var left = grid[i][j - 1];
                var right = grid[i][j + 1];
                if (grid[i][j] > top && grid[i][j] > bottom && grid[i][j] > left && grid[i][j] > right) {
                    grid[i] = grid[i].substring(0, j) + "X" + grid[i].substring(j + 1);
                }
            }
        }
        return grid;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    let result = cavityMap(grid);

    ws.write(result.join("\n") + "\n");

    ws.end();
}