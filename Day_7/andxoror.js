function processData(input) {
    input = input.split("\n");
    var n = parseInt(input[0]);
    var list = input[1].split(" ").map(Number);
    var max = 0;
    var s = [];
    var xor = function(a, b) {
        return a ^ b;
    }
    for (var i = 0; i < n; i++) {
        while (s.length > 0) {
            max = Math.max(max, xor(list[i], list[s[s.length-1]]));
            if (list[s[s.length-1]] > list[i]) {
                s.pop();
            } else {
                break;
            }
        }
        s.push(i);
    }
    console.log(max);
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