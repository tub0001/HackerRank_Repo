'use strict';

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

// Complete the separateNumbers function below.
function separateNumbers(s) {
    var flag = false;
    var first = -1;
    for (var i = 1; i <= parseInt(s.length / 2); i++) {
        var x = parseInt(s.substring(0, i));
        first = x;
        var test = x + "";
        while (test.length < s.length) {
            test += x + 1 + "";
            x = x + 1;
        }
        if (test == s) {
            flag = true;
            break;
        }
    }
    console.log(flag ? "YES " + first : "NO");

}

function main() {
    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        separateNumbers(s);
    }
}
