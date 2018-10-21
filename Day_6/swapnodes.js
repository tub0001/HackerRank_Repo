function processData(input) {
    function parse(str) {
        return parseInt(str, 10);
    };
    var lines = input.split('\n');
    
    var nodesNum = parse(lines.shift());
    
    var nodes = [];
    for (var i = 0; i < nodesNum; i++) {
        nodes.push(lines.shift()
                        .split(' ')
                        .map(parse));
    }
    
    var swapsNum = parse(lines.shift());
    var swapDepths = [];
    
    for (var i = 0; i < swapsNum; i++) {
        swapDepths.push(parse(lines.shift()));
    }
    
    var tree = buildTree(nodes);
    swapSubTrees(tree, swapDepths);
} 

function buildTree(nodes) {
    var root = createNode(1);
    
    var queue = [];
    queue.push(root);
    
    while(queue.length > 0) {
        
        var children = nodes.shift();
        
        var node = queue.shift();
        var left = createNode(children[0]);
        var right = createNode(children[1]);
        
        if (children[0] !== -1) {
            node.left = left;
            queue.push(left);
        }
        
        if (children[1] !== -1) {
            node.right = right;
            queue.push(right);
        }
    }
    
    return root;
}


function createNode(value) {
    return {
        value: value,
        left: null,
        right: null
    }
}

function swapSubTrees(tree, swapDepths) {
    
    for (var i = 0; i < swapDepths.length; i++) {
        doSwapSubTree(tree, swapDepths[i], 1);
        console.log(printTree(tree, []).join(' '));
    }
    
}

function printTree(root, values) {
    if (root === null) {
        return;
    }
    
    printTree(root.left, values);
    values.push(root.value);
    printTree(root.right, values);
    return values;
}

function doSwapSubTree(root, swapDepth, depth) {
    if (root === null) {
        return;
    }
    
    doSwapSubTree(root.left, swapDepth, depth + 1);
    
    var didSwap = false;
   
    if (depth % swapDepth === 0) {
        var temp = root.left;
        root.left = root.right;
        root.right = temp;
        didSwap = true;
    }
    
       
    
    if (didSwap) {
        doSwapSubTree(root.left, swapDepth, depth + 1);
    }
    else {
        doSwapSubTree(root.right, swapDepth, depth + 1);
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