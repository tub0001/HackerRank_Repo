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

// Complete the surfaceArea function below.
function surfaceArea(A,H,W) {
    var result = 0;
    for(var row = 0; row < W; row++){
        for (var col = 0; col < H; col++){
        
            result += 4 * A[row][col] + 2;
            result -= 2 * Math.min(A[row][col], A[row+1][col]);
            result -= 2 * Math.min(A[row][col], A[row][col+1]);
        } 
    } 
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const HW = readLine().split(' ');

    const H = parseInt(HW[0], 10);

    const W = parseInt(HW[1], 10);

    let A = Array(H);

    for (let i = 0; i < H; i++) {
        A[i] = readLine().split(' ').map(ATemp => parseInt(ATemp, 10));
    }

    let result = surfaceArea(A,H,W);

    ws.write(result + "\n");

    ws.end();
}