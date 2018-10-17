function total(ranks, len) {
    var i, sum = 0,
        candies = [];
    for (i = 0; i < len; ++i) candies.push([1, 1]);
    for (i = 0; i < len - 1; ++i)
        if (ranks[i + 1] > ranks[i]) candies[i + 1][0] = candies[i][0] + 1;
    for (i = len - 1; i > 0; --i)
        if (ranks[i - 1] > ranks[i]) candies[i - 1][1] = candies[i][1] + 1;
    for (i = 0; i < len; ++i) sum += Math.max(candies[i][0], candies[i][1]);

    return sum;
}

function processData(input) {
    var data = input.split(/[\r\n\s]+/).map(function(e) { return e - 0; }),
        len = data.shift();
    console.log(total(data, len));
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