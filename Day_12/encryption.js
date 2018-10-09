
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

// Complete the encryption function below.
function encryption(s) {
    var row = Math.floor(Math.pow(s.length, 0.5));
    var col = Math.ceil(Math.pow(s.length, 0.5));
    var ans = "";
    for (var i = 0; i < col; i++) {
        var j = 0;
        while (i + j < s.length) {
            ans = ans + s.substring(i + j, i + j + 1);
            j = j + col;
        }
        ans = ans + " ";
    }
    return ans;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = encryption(s);

    ws.write(result + "\n");

    ws.end();
}