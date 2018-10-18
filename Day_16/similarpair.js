function findSimilarPairCount(nodes, parent, T) {
    var count = 0;
    var stack = nodes[parent];
    

    
    var nextStack = [];
    while (stack.length > 0) {
        stack.forEach(function (child) {
            if (Math.abs(parent - child) <= T) {
                count++;
            }
            
            nodes[child].forEach(function (grandChild) {
                nextStack.push(grandChild);
            });
        });
        
        stack = nextStack;
        nextStack = [];
    }
    return count;
}

function processData(input) {
    var lines = input.split("\n");
    var line0 = lines[0].split(" ");
    var N = parseInt(line0[0]);
    var T = parseInt(line0[1]);
    
    var nodes = [];
    for (var i=0; i<N; ++i) {
        nodes.push([]);
    }

    for (var i=0; i<N-1; ++i) {
        var line = lines[1+i].split(" ");
        var parent = parseInt(line[0]) - 1;
        var child = parseInt(line[1]) - 1;
        nodes[parent].push(child);        
    }

    var count = 0;
    for (var i=0; i<nodes.length; ++i) {
        count += findSimilarPairCount(nodes, i, T);
    }
    
    console.log(count);
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