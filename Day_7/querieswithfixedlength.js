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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the solve function below.
function solve(arr, queries) {
     var results = [];
    for (var i = 0; i < queries.length; i++) {

        var query = queries[i];

        var min = -1;
        var queryMax = 0;
        var queryMaxIdx = 0;
        for (var j = 0, len = arr.length-query; j <= len; j++) {

            if (queryMaxIdx <= j) {
                queryMax = 0;
                queryMaxIdx = j;
                for (var k=j; k < j+query; k++) {

                    var kvalue = arr[k];
                    if (kvalue > queryMax) {

                        queryMax = kvalue;
                        queryMaxIdx = k;
                    }
                }
            }
            else {
                
                // Here we have the previous maximus.
                // So the new number is only the new one in the sliding window.
                var kIdx = j+query-1;
                var kvalue = arr[kIdx];
                if (kvalue > queryMax) {

                    queryMax = kvalue;
                    queryMaxIdx = kIdx;
                }

            }

            if (min < 0) {
                min = queryMax;
            }
            else {
                min = min < queryMax ? min : queryMax;
            }
        }

        results.push(min);
    }

    return results;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nq = readLine().split(' ');

    const n = parseInt(nq[0], 10);

    const q = parseInt(nq[1], 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let queries = [];

    for (let queriesItr = 0; queriesItr < q; queriesItr++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = solve(arr, queries);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
