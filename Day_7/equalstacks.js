function processData(input) {
    let lines = input.split("\n");
    //let heights = lines[0].split(" ").map(Number);
    let n1 = lines[1].split(" ").map(Number);
    let n2 = lines[2].split(" ").map(Number);
    let n3 = lines[3].split(" ").map(Number);
    let n1height = sumArr(n1);
    let n2height = sumArr(n2);
    let n3height = sumArr(n3);
    while (!equalHeights(n1height, n2height, n3height)) {
        let tallestHeight = Math.max(n1height, n2height, n3height);
        if (tallestHeight === n1height) {
            n1height -= n1[0];
            n1.shift();
        }
        else if (tallestHeight === n2height) {
            n2height -= n2[0];
            n2.shift();
        }
        else if (tallestHeight === n3height) {
            n3height -= n3[0];
            n3.shift();
        }
    }
    console.log(n1height); // All equal at this point
}

function sumArr(arr) {
    return arr.reduce((p, c) => p + c, 0);
}

function equalHeights(h1, h2, h3) {
    return !((h1 ^ h2) | (h2 ^ h3));
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