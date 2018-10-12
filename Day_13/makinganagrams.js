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

// Complete the makingAnagrams function below.
function makingAnagrams(s1, s2) {
    var test = [];
    for (var i = 0; i < 26; i++) {
        test[i] = 0;
    }
    for (var i = 0; i < s1.length; i++) {
        test[s1.charAt(i).toString().charCodeAt(0) - 97]++;
    }
    console.log(test);
    for (var i = 0; i < s2.length; i++) {
        test[s2.charAt(i).toString().charCodeAt(0) - 97]--;
    }
    console.log(test);

    var count = 0;
    for (var i = 0; i < 26; i++) {
        count +=Math.abs(test[i]);
    }

    return count;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = makingAnagrams(s1, s2);

    ws.write(result + "\n");

    ws.end();
}
