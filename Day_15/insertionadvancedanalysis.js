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

// Complete the insertionSort function below.
function merge(arr, left, right) {
    var i = 0, j = 0, count = 0, leftLength = left.length, rightLength = right.length;
    while(i < leftLength || j < rightLength) {
        if(i === leftLength) {
            arr[i + j] = right[j];
            j++;
        } else if (j === rightLength) {
            arr[i + j] = left[i];
            i++;
        } else if(left[i] <= right[j]) {
            arr[i + j] = left [i];
            i++;
        } else {
            arr[i + j] = right [j];
            count += leftLength - i;
            j++;
        }
    }
    return count;
}
function insertionSort(arr) {
    var length = arr.length
    if(length < 2){
        return 0;  
    }    
    var middle = (length + 1) / 2;
    var left = arr.slice(0, middle);
    var right = arr.slice(middle, length);
    return insertionSort(left) + insertionSort(right) + merge(arr, left, right);
}



function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        let result = insertionSort(arr);

        ws.write(result + "\n");
    }

    ws.end();
}