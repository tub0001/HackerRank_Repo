'use strict';

const fs = require('fs');

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

// Complete the dynamicArray function below.
function dynamicArray(n, queries) {
      var a = [n];
    var query, querytype,temp;
         for(var i=0;i<n;i++)
           {
               a[i]=[];
          }
         var res = [];
         var lastAnswer = 0;
         for(var i=0;i<queries.length;i++)
             {
                 var querytype1 = queries[i][0];
                 var querytype2 = queries[i][1];
                 var querytype3 = queries[i][2];
                 
             if(querytype1 == 1) {
                 var seq =  querytype2 ^ lastAnswer;
                 seq = seq % n;
                 
                 a[seq].push(querytype3);
               
                 
             }
             else {
                 var seq = querytype2 ^ lastAnswer;
                 seq = seq % n;
                 temp=a[seq];
                 lastAnswer = temp[querytype3 % temp.length];
               
                 res.push(lastAnswer);
             }
         }
         return res;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nq = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nq[0], 10);

    const q = parseInt(nq[1], 10);

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result = dynamicArray(n, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}