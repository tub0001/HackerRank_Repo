'use strict';


function update(n) {
    var w = 0;
    var c = 1;

    while (n != null) {
        if (n.dir == 1) {
            w += n.w2 + n.c2 * c;
            n.w1 += c;
            n.c1++;
        } else if (n.dir == 2) {
            w += n.w1 + n.c1 * c;
            n.w2 += c;
            n.c2++;
        }

        c++;
        n.dir = 0;
        n = n.p;
    }

    return w;
}


function processData(input) {
    var parse_fun = function (s) { return parseInt(s, 10); };

    var lines = input.split('\n');
    var N = parse_fun(lines.shift());
    var A = lines.shift().split(' ').splice(0, N).map(parse_fun);

    var res = new Array(N);
    for (var i = 0; i < N; i++) {
        res[i] = 0;
    }

    var w = 0;
    var root = { p: null, v: A[0], n1: null, w1: 0, c1: 1, n2: null, w2: 0, c2: 1, dir: 0 };
    res[0] = 0;

    for (var i = 1; i < N; i++) {
        var v = A[i];
        var n = root;
        var last = null;

        while (n != null) {
            if (v == n.v) {
                last = null;
                n = null;
                break;
            }

            last = n;
            if (v < n.v) {
                n.dir = 1;
                if (n.n1 == null) {
                    n.n1 = { p: n, v: v, n1: null, w1: 0, c1: 1, n2: null, w2: 0, c2: 1, dir: 0 };
                    n = null;
                } else {
                    n = n.n1;
                }
            } else { // v > n.v
                n.dir = 2;
                if (n.n2 == null) {
                    n.n2 = { p: n, v: v, n1: null, w1: 0, c1: 1, n2: null, w2: 0, c2: 1, dir: 0 };
                    n = null;
                } else {
                    n = n.n2;
                }
            }
        }

        w += update(last);
        res[i] = w;
    }

    var out = '';
    for (var i = 0; i < N; i++) {
        out += res[i].toString(10) + '\n';
    }
    process.stdout.write(out);
}


process.stdin.resume();
process.stdin.setEncoding("ascii");
var _input = "";
process.stdin.on("data", function (input) { _input += input; });
process.stdin.on("end", function () { processData(_input); });