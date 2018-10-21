function processData(input) {
    //Enter your code here
    input
        .split('\n')
        .slice(1)
        .map(function(q) {
            return q.split(' ').map(Number);
        })
        .reduce(function(stacks, q) {
            var type = q[0];
            var max = stacks.maxNums[stacks.maxNums.length - 1];
            if (type === 1) {
                if (stacks.maxNums.length === 0 || q[1] >= max) {
                    stacks.maxNums.push(q[1]);
                }
                stacks.nums.push(q[1]);
            } else if (type === 2) {
                var poppedNum = stacks.nums.pop();
                if (poppedNum === max) {
                    stacks.maxNums.pop();
                }
            } else {
                console.log(max);
            }
            return stacks;
        }, { nums: [], maxNums: [] });
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
