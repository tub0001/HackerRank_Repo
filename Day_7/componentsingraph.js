function processData (input) {
    var lines = input.split("\n");
    var n = parseInt(lines[0]);

    var nodes = [];
    for (var i = 0; i < n * 2; ++i) {
        nodes.push(
            { data: i + 1, parent: null, count: 1 });
    }

    var findRoot = function(node) {
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

    for (var i = 0; i < n; ++i) {
        var temp = lines[i + 1].split(" ");
        var g = nodes[parseInt(temp[0]) - 1];
        var b = nodes[parseInt(temp[1]) - 1];

        var setA = findRoot(g);
        var setB = findRoot(b);

        if (setA.data === setB.data) {
            continue;
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

    var min = null;
    var max = null;
    for (var i = 0; i < n; ++i) {
        var node = nodes[i];
        if (node.count > 1) {
            min = min === null ? node.count : Math.min(min, node.count);
            max = max === null ? node.count : Math.max(max, node.count);
        }
    }

    process.stdout.write(min + " " + max + "\n");
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