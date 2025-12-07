const fs = require('fs');

async function processData(filename) {
  try {
    const result = fs
    .readFileSync(filename, "utf-8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map(s => s.split(",").map(s => s.split("-").map(Number)))

    return result;
  } catch (err) {
    console.log(err);
  }
}

function findElement(data) {
    result = [];
    sum = 0;
    for(i in data) {
        if(((data[i][0][0]<=data[i][1][0]) && (data[i][0][1]>=data[i][1][1])) || ((data[i][1][0]<=data[i][0][0]) && (data[i][1][1]>=data[i][0][1]))) {
          sum++;
          //console.log(sum);
        }
    }
    return sum;
  }

const data = processData('./day4/data.txt');  //read and process data into a two dimensional array. strategyData[A,B,C][X,Y,Z]
data.then((result) => console.log(findElement(result))); //show the result