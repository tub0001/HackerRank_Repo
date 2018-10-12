'use strict';
const fs = require('fs');
const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the countSort function below.
function countSort(arr) {
    var maxindex = 0;
    for (var i = 0; i < arr.length; i++) {
        if (maxindex < arr[i][0]) {
            maxindex = arr[i][0];
        }
        if (i < arr.length / 2) {
            arr[i][1] = "-";
        }
    }
    //console.log(arr);
    //console.log(maxindex);
    var result = new Array(maxindex + 1);
    for (var i = 0; i <= maxindex; i++) {
        result[i] = [];
    }
    for (var i = 0; i < arr.length; i++) {
        var x = arr[i][0];
        result[x].push(arr[i][1]);
    }
    console.log(result);
    var str = "";
    for (var i in result) {
        if (result[i].length > 0) {
            var string = str.concat(result[i].join(" ") + " ");
            str = string;
        }

    }
    ws.write(str);

}

function main() {
    const n = parseInt(readLine().trim(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    countSort(arr);
}
