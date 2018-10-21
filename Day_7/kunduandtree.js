function combinations3(size) {
    return (size * (size - 1) * (size - 2)) / 6;
}

function combinations2(size) {
    return (size * (size - 1)) / 2;
}

function findRoot(node) {
    var path = [];
    var root = node;
    while (root.parent !== null) {
        path.push(root);
        root = root.parent;
    }

    while (path.length > 0) {
        var child = path.shift();
        child.parent = root;
    }

    return root;
}

function merge(nodeA, nodeB) {
    var setA = findRoot(nodeA);
    var setB = findRoot(nodeB);

    if (setA.data === setB.data) {
        return;
    }

    var child;
    var parent;
    if (setB.count > setA.count) {
        child = setA;
        parent = setB;
    }
    else {
        child = setB;
        parent = setA;
    }

    child.parent = parent;
    parent.count += child.count;
    child.count = 0;
}

function processData (input) {
    var lines = input.split("\n");
    var n = parseInt(lines[0]);

    var nodes = [];
    for (var i = 0; i < n; ++i) {
        nodes.push(
            { data: i + 1, parent: null, count: 1 });
    }

    for (var i = 0; i < n - 1; ++i) {
        var temp = lines[i + 1].split(" ");
        if (temp[2] === 'b') {
            merge(
                nodes[parseInt(temp[0]) - 1],
                nodes[parseInt(temp[1]) - 1]);
        }
    }

    var count = combinations3(n);
    for (var i = 0; i < n; ++i) {
        var node = nodes[i];
        if (node.count >= 3) {
          
            count -= combinations3(node.count);

            
            count -= combinations2(node.count) * (n - node.count);
        }
        else if (node.count == 2) {
           
            count -= (n - node.count);
        }
    }

    var maxValue = Math.pow(10, 9) + 7;
    if (count > maxValue) {
        count = count % maxValue;
    }
    
    process.stdout.write(count.toString());
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