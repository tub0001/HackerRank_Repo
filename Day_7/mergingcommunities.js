function Node(data) {
    this.data = data;
    this.fp = null;
}

function processData(input) {
    //Enter your code here
     var lines = input.split("\n");
    var N = parseInt(lines[0].split(" ")[0]);
    var Q = parseInt(lines[0].split(" ")[1]);

    var merged = {};
    var commlengths = {};

    for(var i = 1; i <= Q; i++) {
        var cmd = lines[i].split(" ");
        //console.log(lines[i]);

        if(cmd[0] === "Q") {
            var comm = merged[parseInt(cmd[1])];

            if(!comm) {
                console.log(1);
            }
            else {
                var curr = comm;

                while(curr.fp !== null)
                    curr = curr.fp;

                console.log(commlengths[curr.data]);
            }
        }
        else {
            var x = parseInt(cmd[1]);
            var y = parseInt(cmd[2]);
            if(x == y)
                continue;

            var prx = merged[x] ? merged[x] : new Node(x);
            var pry = merged[y] ? merged[y] : new Node(y);
            merged[x] = prx;
            merged[y] = pry;

            while(prx.fp !== null)
                prx = prx.fp;
            while(pry.fp !== null)
                pry = pry.fp;

            if(pry === prx)
                continue;

            pry.fp = prx;
            var xsize = commlengths[prx.data] ? commlengths[prx.data] : 1;
            var ysize = commlengths[pry.data] ? commlengths[pry.data] : 1;

            commlengths[prx.data] = xsize + ysize;
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
