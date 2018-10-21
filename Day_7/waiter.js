function computePrimes(n) {
    var primes = [];
    for (var i = 1; i <= n; i++) {
        var counter = 0;
        for (var j = i; j >= 1; j--) {
            if (i%j === 0) {
                counter++;
            }
        }
        if (counter === 2) {
            primes.push(i);
        }
    }
    return primes;
}

function processData(input) {
    input = input.split("\n").map(function(e){
        return e.split(" ").map(Number);
    });
    var n = input[0][0];
    var q = input[0][1];
    var list = input[1];
    var primes = computePrimes(10000);
    var stacks = [list];

    for (var i = 0; i < q; i++) {
        var a = [];
        var b = [];
        while(stacks[stacks.length-1].length > 0) {
            var num = stacks[stacks.length-1].pop();
            if (num % primes[i] === 0) {
                a.push(num);
            } else {
                b.push(num);
            }
        }
        if (a.length > 0) {
            stacks.push(a);
        }
        if (b.length > 0) {
            stacks.push(b);
        }
    }

    for (var j = 0; j < stacks.length; j++) {
        if (stacks[j].length > 0) {
            while (stacks[j].length > 0) {
                console.log(stacks[j].pop());
            }
        }
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