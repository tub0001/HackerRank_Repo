function processData(input) {

    var lines = input.split("\n");
    var n = parseInt(lines[0]);
    var grid = [];
    var queue = [];

    for (var i = 1; i <= n; i++) {
        grid.push(lines[i].split(""));
    }

    var coords = lines[i].split(" ").map(Number);

    grid[coords[0]][coords[1]] = 0;
    queue.push({ x: coords[1], y: coords[0] });

    while (queue.length) {

        var currPoint = queue.shift();

        var newPoints = getPoints(currPoint.x, currPoint.y, grid, n);

        var currVal = grid[currPoint.y][currPoint.x];

        for (i = 0; i < newPoints.length; i++) {
            if (isNaN(grid[newPoints[i].y][newPoints[i].x])) {
                grid[newPoints[i].y][newPoints[i].x] = currVal + 1;
            }

            if (newPoints[i].y === coords[2] && newPoints[i].x === coords[3]) {
                console.log(currVal + 1);
                return ;
            }
            queue.push(newPoints[i]);
        };
    }
    console.log("No path to move castle");
    return ;
}

function getPoints(x, y, grid, n) {

    var stack = [];
    var xPos = x;
    var yPos = y;

    while (xPos < n - 1 && grid[yPos][xPos] !== "X") {
        xPos++;
        if (grid[yPos][xPos] === ".") {
            stack.push({ x: xPos, y: yPos });
        }

    }
    xPos = x;

    while (xPos >= 1 && grid[yPos][xPos] !== "X") {
        xPos--;
        if (grid[yPos][xPos] === ".") {
            stack.push({ x: xPos, y: yPos });
        }
    }

    xPos = x;  

    while (yPos >= 1 && grid[yPos][xPos] !== "X") {
        yPos--;
        if (grid[yPos][xPos] === ".") {
            stack.push({ x: xPos, y: yPos });
        }
    }

    yPos = y;

    while (yPos < n - 1 && grid[yPos][xPos] !== "X") {
        yPos++;
        if (grid[yPos][xPos] === ".") {
            stack.push({ x: xPos, y: yPos });
        }
    } 
    return stack;
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