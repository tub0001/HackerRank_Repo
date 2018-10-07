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

// Complete the permutationEquation function below.
function permutationEquation(p) {
    
     var value=1;
        var index=0;
        var index1=0;
        var res=[];
        for(var count=1;count<=p.length;count++)
        {
        for(var i=0;i<p.length;i++)
        {
            if(value==p[i])
            {
                index=i+1;
                for(var l=0;l<p.length;l++)
                {
                    if(index==p[l])
                    {
                        index1=l+1;
                        res[value-1]=index1;
                        value++;
                    }
                }
            }
            
        }
        }
        return res;


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const p = readLine().split(' ').map(pTemp => parseInt(pTemp, 10));

    let result = permutationEquation(p);

    ws.write(result.join("\n") + "\n");

    ws.end();
}