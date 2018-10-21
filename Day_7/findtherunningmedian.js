'use strict';


function median(arr) {
    if (arr.length == 0) { return "Wrong!"; }

    if (arr.length % 2 == 1) {
        return arr[Math.floor(arr.length / 2)];
    } else {
        var idx = arr.length / 2;
        return (arr[idx - 1] + arr[idx]) / 2;
    }
}


function binarySearch(arr, n, idx0, idx1) {
    if (n <= arr[idx0]) { return idx0; }
    if (arr[idx1] < n)  { return idx1 + 1; }
    if (idx1 - idx0 == 1) { return idx1; }
    var idx = idx0 + Math.floor((idx1 - idx0 + 1) / 2);
    if (n <= arr[idx]) { return binarySearch(arr, n, idx0, idx); }
    if (arr[idx] < n)  { return binarySearch(arr, n, idx, idx1); }
}


function processData(input) {
    var lines = input.split('\n');
    var n = parseInt(lines[0], 10);

    var res = [];
    var arr = [];
    for (var i = 1; i <= n; i++) {
        var e = parseInt(lines[i], 10);

        var idx = binarySearch(arr, e, 0, arr.length - 1);
        arr.splice(idx, 0, e);
        res.push(median(arr).toFixed(1));
    }
    process.stdout.write(res.join('\n'));
    process.stdout.write('\n');
}


process.stdin.resume();
process.stdin.setEncoding('ascii');
var _input = '';
process.stdin.on('data', function (input) { _input += input; });
process.stdin.on('end', function () { processData(_input); });