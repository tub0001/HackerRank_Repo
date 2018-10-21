function processData(input) {
    //Enter your code here
     var inputArray = input.split('\n');
    var output='';
    var testCase = parseInt(inputArray[0]);
    var actions;
    var myHeap=[];

    function swap(i, j){             // swap;
        var temp;
        temp = myHeap[i];
        myHeap[i] = myHeap[j];
        myHeap[j] = temp;

    }
    function bubble(i){
        var pi = Math.floor(i/2);  // parent's index
        if(myHeap[i] < myHeap[pi]){
            swap(i, pi);
            bubble(pi);
        }
    }
    function bubble_down(i){
        var ci = (myHeap[i*2] < myHeap[i*2 +1]) ? i*2: i*2 +1;  // child index
        if(myHeap[ci]<myHeap[i]){
            swap(ci, i);
            bubble_down(ci)
        }
    }
    function addHeap(n){
        myHeap.push(n);
        bubble(myHeap.length-1);
    }
    function deleteFromHeap(n) {

        for(var i=0;i<myHeap.length;i++){
            if(myHeap[i]==n){
                myHeap[i] = myHeap[myHeap.length-1];
                myHeap.pop();
                bubble_down(i);
                return;
            }
        }
    }

    function peakMin(){
        return myHeap[0];
    }
    for(var i=1;i<=testCase;i++){
        actions = inputArray[i].split(' ');
        if(parseInt(actions[0])==1){
            //myHeap.push(parseInt(actions[1]));
            addHeap(parseInt(actions[1]));
        }else if(parseInt(actions[0])==2){
            deleteFromHeap(parseInt(actions[1]));
        }else{
            output += peakMin()+'\n';
        }
    }
    
    console.log(output); 
    
    
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
