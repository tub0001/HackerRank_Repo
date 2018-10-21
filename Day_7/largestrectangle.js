function processData(input) {
    // Get Inputs
    var npt = input.split('\n');
    var N = npt[0];
    var heights = npt[1].split(' ').map(function(x) { 
        return parseInt(x); 
    });
    
    // naiive code
    var greatestArea = 0;
    var greatestArea_loc = 0;
    
    for (var i = 0; i < N; i++) {
        // Search right
        var areaR = heights[i];
        for (var j = i+1; heights[j] >= heights[i]; j++) {
            if (j >= N) { break; }
            //console.log(">"+i+": "+heights[j]+" <=? "+heights[i]);
            areaR += heights[i];
        }
        //console.log("        " + i + " >>> " + areaR);
        
        /*if (areaR > greatestArea) {
            greatestArea = areaR;
            greatestArea_loc = i;
        }*/
        
        
        // Search left
        var areaL = heights[i];
        for (var k = i-1; heights[k] >= heights[i]; k--) {
            if (k < 0) { break; }
            //console.log("<"+i+": "+heights[k]+" <=? "+heights[i]);
            areaL += heights[i];
        }
        
        /*if (areaL > greatestArea) {
            greatestArea = areaL;
            greatestArea_loc = i;
        }*/
        
        var totalArea = areaL + areaR - heights[i];
        
        if (totalArea > greatestArea) {
            greatestArea = totalArea;
            greatestArea_loc = i;
        }
        //console.log("        " + i + " <<< " + areaL);
    }
    
    //console.log("Final: " + greatestArea);
    console.log(greatestArea);
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