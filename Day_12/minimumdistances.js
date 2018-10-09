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

// Complete the minimumDistances function below.
function minimumDistances(n, a) {

    var map = new Map();
    var min_dist = n;
    for (var i = 0; i < n; i++) {
        if (map.has(a[i])) {
            if ((i - map.get(a[i])) < min_dist)
                min_dist = i - map.get(a[i]);
        }
        map.set(a[i], i);
    }
    //console.log(min_dist);
    return (min_dist == n ? -1 : min_dist);
}
    function main() {
        const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

        const n = parseInt(readLine(), 10);

        const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

        let result = minimumDistances(n, a);

        ws.write(result + "\n");

        ws.end();
    }