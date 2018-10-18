function processData(input) {
    //Enter your code here
    var lines = input.split('\n');

    var m_len = lines[0].split(' ')[1];
    var n_len = lines[0].split(' ')[0];

    var distances = [];

    for (var n = 1; n <= n_len; n++) {
        distances.push([]);
    }

    var edges = [];
    for (var m = 0; m < m_len; m++) {
        var edg = lines[m + 1].split(' ');
        if (edg[0] > edg[1]) {
            edg = [edg[1], edg[0], edg[2]];
        }
        edges.push(edg);
    }

    var last_idx = 1 + parseInt(m_len);
    var path = lines[last_idx].split(' ');

    //Undirected graph ->
    var n_st = path[0];
    var n_fn = path[1];
    if (n_st > n_fn) {
        n_st = path[1];
        n_fn = path[0];
    }
    
    findPath(n_st, edges, distances);

    for(var node = 0; node < distances.length; node++) {
        if(node == (n_fn - 1)) {
            var dist = getMinDistance(distances[node]);
            if (dist == Infinity) {
                dist = -1;
            }
            console.log(dist);
        }
    }
}
function findPath(n_st, edges, distances) {
    var unvisited = [];    
    var revisited = [];

    var current = n_st; //is node index
    distances[current - 1] = [0];
    
    for(var node = 0; node < distances.length; node++) {
        unvisited.push(node + 1);
    }

    while (unvisited.length > 0) {
        for(var e = 0; e < edges.length; e++) {
            var edge = edges[e];            
            var lnk = isOnLink(current, edge);
            
            if (lnk != 0) {                
                var node_idx = getNode(edge, lnk);
                
                var weight = parseInt(edge[2]);                
                for(var nd = 0; nd < distances[node_idx - 1].length; nd++) {
                    var wt = weight | distances[node_idx - 1][nd];
                    if (distances[current - 1].indexOf(wt) == -1) {
                        distances[current - 1].push(wt);
                        if (unvisited.indexOf(node_idx) == -1 && revisited.indexOf(node_idx) == -1) {
                            unvisited.push(node_idx);
                            revisited.push(node_idx);
                        }
                    }    
                }
                
                for(var nd = 0; nd < distances[current - 1].length; nd++) {
                    var wt = weight | distances[current - 1][nd];
                    if (distances[node_idx - 1].indexOf(wt) == -1) {
                        distances[node_idx - 1].push(wt);
                        if (unvisited.indexOf(node_idx) == -1 && revisited.indexOf(node_idx) == -1) {
                            unvisited.push(node_idx);
                            revisited.push(node_idx);
                        }
                    }    
                }                     
            }
        }
        //console.log(distances);
        unvisited.splice(unvisited.indexOf(current), 1);
        current = unvisited[0];

        for (var i = 0; i < unvisited.length; i++) {
                var idx = unvisited[i];
                if (getMinDistance(distances[idx - 1]) < getMinDistance(distances[current - 1])) {
                    current = idx;
                }
        }
    }
}

function existsInPaths(idx, paths) {
    var d_path = false;
    paths.forEach(function(path) {
        if (path.idx == idx) {
            d_path = path;
            return;
        }
    });
    return d_path;
}

function isOnLink(idx, link) {
    if (link[0] == idx) {
        return -1;
    } else if (link[1] == idx) {
        return 1;
    } else {
        return 0;
    }
}

function getNode(edge, lnk) {
    var idx = parseInt(lnk == -1 ? edge[1] : edge[0]);
    return idx;
}

function getMinDistance(distances) {
    if (distances.length == 0) {
        return Infinity;
    } else {
        return arrayMin(distances);
    }
}

function arrayMin(arr) {
    return Math.min.apply(Math, arr);
};

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function(input) {
    _input += input;
});

process.stdin.on("end", function() {
    processData(_input);
});