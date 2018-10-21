

function processData(input) {
    let curTime = 0;
    let waiting = 0;
    let map = {};
    let lines = input.split('\n').slice(1).map(c => {
        const [time, dur] = c.split(' ');
        return {time: Number(time), dur: Number(dur)};
    });
    lines.sort((a, b) => a.dur - b.dur);
    lines.forEach((c, id) => {
        map[id] = Object.assign(c, {id});
    })
    let keys = Object.keys(map);
    while(keys.length) {
        let leastTime = null;
        let leastDur = null;
        let timeIndex = null;
        let durIndex = null;
        for(let index=0; index < keys.length; index++) {
            const item = map[keys[index]];
            if(item.time <= curTime ) {
                if(!leastDur || item.dur < leastDur.dur) {
                    leastDur = item;
                    durIndex = index;
                    break;
                }
            }
            if(!leastTime || item.time < leastTime.time) {
                leastTime = item;
                timeIndex = index;
            }
        }
        if(!leastDur) curTime = leastTime.time;
        const least = leastDur || leastTime;
        waiting += (least.dur + curTime - least.time);
        curTime += least.dur;
        // delete map[least.id];
        // console.log(durIndex, timeIndex, keys)
        keys.splice(durIndex == null ? timeIndex : durIndex, 1)
    };
    console.log(Math.floor(waiting/lines.length));
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