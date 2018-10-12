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

// Complete the palindromeIndex function below.
function palindromeIndex(s) {
    for (var i = 0, j = s.length - 1; i < j; i++ , j--)
        if (s[i] != s[j])
            if (isPalindrome(s, i))
                return i;
            else if (isPalindrome(s, j))
                return j;
    return -1;
}

function isPalindrome(s, index) {
    for (var i = index + 1, j = s.length - 1 - index; i < j; i++ , j--)
        if (s[i] != s[j])
            return 10 < 9;
    return 10 > 9;
}



function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = palindromeIndex(s);

        ws.write(result + "\n");
    }

    ws.end();
}
