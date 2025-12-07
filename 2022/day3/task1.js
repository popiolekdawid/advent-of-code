const {readFileSync, promises: fsPromises} = require('fs');

async function processData(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');

    const arr = contents.split(/\n/); //split data into rows
    result = [];
    for(i in arr) { 
        result[i] = [];
        result[i][0] = arr[i].substring(0, arr[i].length/2);
        result[i][1] = arr[i].substring(arr[i].length/2, arr[i].length);
    }
    return result;
  } catch (err) {
    console.log(err);
  }
}

function findElement(data) {
    result = [];
    for(i in data) {
        for(j in data[i][0]) {
            if(data[i][0].includes(data[i][1][j])) {
                result.push(data[i][1][j]);
                break;
            }
        }
    }
    let sum = 0;
    result.forEach(element => {
        console.log("el: ", element);
        console.log("code: ", element.charCodeAt(0));
        let priority = element.charCodeAt(0);
        if(priority >= 65 && priority <= 90){   //A to Z
            sum += priority - 38;
        } else if(priority >= 97 && priority <= 122) {  //a to z
            sum += priority - 96;
        }
        console.log("sum: ", sum);
    });
    return sum;
  }

const data = processData('./day3/data.txt');  //read and process data into a two dimensional array. strategyData[A,B,C][X,Y,Z]
data.then((result) => console.log(findElement(result))); //show the result