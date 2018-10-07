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

// Complete the pickingNumbers function below.
function main() {
    // Read input
    var n = parseInt(readLine());
    const a = readLine().split(' ');
    var x = a.map(Number);

    // Construct our map
    var map = new Array(100);
    map.fill(0);

    // Populate map
    for(var i = 0; i < a.length; i++){
        map[a[i]]++;
    }

    // Find the max sum of two values with keys within one of each other
    var max = 0;
    for(var i = 1; i < map.length; i++){
        if(map[i] + map[i - 1] > max){
            max = map[i] + map[i - 1];
        }
    }
    console.log(max);
}