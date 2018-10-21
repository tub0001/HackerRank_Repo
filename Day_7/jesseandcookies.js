function processData(input) {
    input = input.split('\n');
    var s = input[0].split(' ')[1] * 1;
    //Enter your code here
    var heap = input[1].split(' ').map(function(i) {return i * 1;});
    var M = 1000009;
    var count = 0;
    adjustHeap(heap);

    while (true) {
        if (heap.length == 0) break;
        if (heap[0] >= s) break;
        if (heap.length == 1) {
            count = -1;
            break;
        }
        var i = 1;
        if (heap.length > 2 && heap[i+1] < heap[i]) i += 1;
        var ns = heap[0] + heap[i]*2;
        heap[i] = ns;
        heap[0] = heap.pop();
        count += 1;
        downHeap(heap, i);
        downHeap(heap, 0);
//        console.log(heap);
    }
    console.log(count);
} 

function adjustHeap(heap) {
    var n = Math.floor((heap.length - 1) / 2);
    for (var i = n; i >= 0; i -= 1) {
        downHeap(heap, i);
    }
}

function downHeap(heap, i) {
    var cache = heap[i];
    var l = heap.length;
    for (var j = 2*i + 1; j < l; j = 2*j + 1) {
        if (j + 1 < l && heap[j + 1] < heap[j]) j = j + 1;
        if (heap[j] < cache) {
            heap[i] = heap[j];
            i = j;
        } else break;
        heap[i] = cache;
    }
    return heap;
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