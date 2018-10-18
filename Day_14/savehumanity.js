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


function lcp(a, b) {
    let minLength = Math.min(a.length, b.length);

    for (let i = 0; i < minLength; i++) {
        if (a[i] !== b[i]) {
            return i;
        }
    }
    
    return minLength;
}

/*
 * Complete the findStrings function below.
 */
function findStrings(w, queries) {
    let suffixes = new Set();
    
    for (let str of w) {
        for (let i = 0; i < str.length; i++) {
            suffixes.add(str.substr(i, str.length - i));
        }
    }
    
    let sortedSuffixes = Array.from(suffixes).sort((a, b) => a > b ? 1 : -1);
    let lcps = [0];
    
    for (let i = 1; i < sortedSuffixes.length; i++) {
        lcps.push(lcp(sortedSuffixes[i], sortedSuffixes[i - 1]));
    }
    
    return queries.map(q => {
        for (let i = 0; i < sortedSuffixes.length; i++) {
            let suffix = sortedSuffixes[i];
            let lcp = lcps[i];
            
            if (q > suffix.length - lcp) {
                q -= suffix.length - lcp;
            } else {
                return suffix.substr(0, q + lcp);
            }
        }
        
        return 'INVALID';
    });
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const wCount = parseInt(readLine(), 10);

    let w = [];

    for (let wItr = 0; wItr < wCount; wItr++) {
        const wItem = readLine();
        w.push(wItem);
    }

    const queriesCount = parseInt(readLine(), 10);

    let queries = [];

    for (let queriesItr = 0; queriesItr < queriesCount; queriesItr++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = findStrings(w, queries);

    ws.write(result.join("\n") + "\n");

    ws.end();
}