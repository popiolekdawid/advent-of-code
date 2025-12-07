function readData(filename) {
    const fs = require('fs');
    const temp = fs
        .readFileSync(filename,'utf8')
        .split('\n')
    const result = [];
    for(i in temp){
       result[i] = temp[i].split(' ');
    }
    return result;
}

function processData(data) {
    let sum = 0;
    for(i in data) {
        //console.log("Rozmiar: ", data[i].length)
        if(data[i][0] === '$') {
            //console.log(data[i], " <- That's a command")
        } else {
            //console.log(data[i], " <- That's a file")
            if(parseInt(data[i][0])<100000) {
                sum += parseInt(data[i][0]);
            }
        }
    }
    return sum;
}


const data = readData("day7/dataTest.txt");
console.log(processData(data));
