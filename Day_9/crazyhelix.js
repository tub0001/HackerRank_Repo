var input_stdin_array = "";
var input_currentline = 0;

let arr = [];

function readLine() {
    return input_stdin_array[input_currentline++];
}

/*
 * Reverses the order of the contiguous array block [start, ..., end]
 * @param {Number} start  The starting position
 * @param {Number} end  The ending position
 */
function rotateArray(start, end) {
    if (start === end) {
        return;
    }
        
    for (let i = 0; i < (end - start) / 2; i++) {
        const temp = arr[end - i];
        arr[end - i] = arr[start + i];
        arr[start + i] = temp;
    }
}

function printCurrentPosition(num) {    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === num) {
            console.log(`element ${num + 1} is at position ${i + 1}`);
            return;
        }
    }
}

function printCurrentNumber(pos) {    
    console.log(`element at position ${pos + 1} is ${arr[pos] + 1}`);
}

function main(queries) {  
    queries.forEach(q => q.f.apply(null, q.args));
}

function processData(input) {
    input_stdin_array = input.split("\n");
    
    const [n, q] = readLine().split(" ").map(x => parseInt(x));
    arr = [...Array(n).keys()];
    
    const queries = [];
    
    for (let i = 0; i < q; i++) {
        const query = readLine().split(" ").map(x => parseInt(x));
        
        const queryData = {
            f: query[0] === 1 ? rotateArray : query[0] === 2 ? printCurrentPosition : printCurrentNumber,
            args: query.slice(1).map(x => x - 1)
        };
        
        queries.push(queryData);
    }
    
    main(queries);
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});