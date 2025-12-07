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
              case 'X': sum += 0; //loss
                  if(strategyData[i][0] === 'A') { //rock -> we draw scissors to loose
                     sum += 3;
                  } else if(strategyData[i][0] === 'B') {  //paper -> we draw rock to loose
                     sum += 1;
                  } else if(strategyData[i][0] === 'C') { //scissors -> we draw paper to loose
                     sum += 2;
                  }
                  break;
              case 'Y': sum += 3; //draw
                  if(strategyData[i][0] === 'A') { //rock -> we draw rock to have a draw
                      sum += 1;
                  } else if(strategyData[i][0] === 'B') {  //paper -> paper
                      sum += 2;
                  } else if(strategyData[i][0] === 'C') { //scissors -> scissors
                      sum += 3;
                  }
                  break;
              case 'Z': sum += 6; //win
                  if(strategyData[i][0] === 'A') { //rock -> we draw paper to win
                      sum += 2;
                  } else if(strategyData[i][0] === 'B') {  //paper -> scissors to win
                      sum += 3;
                  } else if(strategyData[i][0] === 'C') { //scissors -> rock to win
                      sum += 1;
                  }
                  break;
          }
    }
    return sum;
  }

const strategyData = processData('./day2/data.txt');  //read and process data into a two dimensional array. strategyData[A,B,C][X,Y,Z]
strategyData.then((result) => console.log(findTotalScore(result))); //show the result