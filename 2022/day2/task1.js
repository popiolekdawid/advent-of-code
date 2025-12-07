const {readFileSync, promises: fsPromises} = require('fs');

async function processData(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');

    const arr = contents.split(/\n/); //split data into individual rounds
    const result = [];  //empty array to store the strategy
    for(i in arr) { //iterate over rounds
        result.push(arr[i].split(" ")); //split into columns
    }
    return result;
  } catch (err) {
    console.log(err);
  }
}

function findTotalScore(strategyData) { 
  let sum = 0;   //initialize sum with 0;
  for(i in strategyData) {
        switch(strategyData[i][1]) {
            case 'X': sum += 1; //rock
                if(strategyData[i][0] === 'A') { //rock -> draw
                   sum += 3;
                } else if(strategyData[i][0] === 'B') {  //paper -> loss
                   sum += 0;
                } else if(strategyData[i][0] === 'C') { //scissors -> win
                   sum += 6;
                }
                break;
            case 'Y': sum += 2; //paper
                if(strategyData[i][0] === 'A') { //rock -> win
                    sum += 6;
                } else if(strategyData[i][0] === 'B') {  //paper -> draw
                    sum += 3;
                } else if(strategyData[i][0] === 'C') { //scissors -> loss
                    sum += 0;
                }
                break;
            case 'Z': sum += 3; //scissors
                if(strategyData[i][0] === 'A') { //rock -> loss
                    sum += 0;
                } else if(strategyData[i][0] === 'B') {  //paper -> win
                    sum += 6;
                } else if(strategyData[i][0] === 'C') { //scissors -> draw
                    sum += 3;
                }
                break;
        }
  }
  return sum;
}

const strategyData = processData('./day2/data.txt');  //read and process data into a two dimensional array. strategyData[A,B,C][X,Y,Z]
strategyData.then((result) => console.log(findTotalScore(result))); //show the result