function findBiggestSubstring(string, remainder, min) {
    for (var i=min; i <= remainder.length; i++) {
        if (string.indexOf(remainder.substring(0, i)) == -1) {
            return i - 1;
        }
    }
    return i - 1;
}

// given a string, the cost to add and the cost to copy, determine minimum cost
function calculate(string, costAdd, costCopy) {
    var costPerState = [];
    costPerState[string.length-1] = 0;
    biggestPerState = [];
    var biggest = 0;
    for (var i=0; i < string.length; i++) {
        var substring = string.substring(0, i+1);
        var remainder = string.substring(i+1);
        biggest = findBiggestSubstring(substring, remainder, biggest);        
        biggestPerState[i] = biggest;
    }
    for (var i=string.length-2; i >= 0; i--) {
        var minCost = costAdd + costPerState[i+1];
        for (var j=1; j <= biggestPerState[i]; j++) {
            var cost = costCopy + costPerState[i+j];
            minCost = Math.min(minCost, cost);
        }
        costPerState[i] = minCost;
    }
    return costAdd + costPerState[0];
}

function processData(input) {
    var lines = input.split("\n");
    var cases = lines[0];
    for (var t=0; t < cases; t++) {
        var ints = lines[t*2+1].split(' ');
        var string = lines[t*2+2];
        var result = calculate(string, parseInt(ints[1]), parseInt(ints[2]));
        console.log(result);
    }
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