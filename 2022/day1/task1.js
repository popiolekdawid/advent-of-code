const {readFileSync, promises: fsPromises} = require('fs');

async function processData(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');

    const arr = contents.split(/\n\n/); //split calorie data into individual Elves
    
    const result = [];  //empty array to store the final calorie values
    for(i in arr) { //iterate over elves
        result.push(arr[i].split("\n")); //split into individual meals carried by each Elf
    }
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}

function findElf (calorieData) { //find elf with the most calories
  const sum = [];
  for (i in calorieData) {
      sum.push(0);
    for (j in calorieData[i]) {
      sum[i] += parseInt(calorieData[i][j]);  //sum up each elfs snacks
    }
  }
  sum.pop(); //get rid of NaN at the end
  return Math.max(...sum); //find the Elf with the biggest calorie sum
}

const calorieData = processData('./day1/data.txt');  //read and process calorie data into a two dimensional array. (calorieData[index of Elf][snacks he carries]
calorieData.then((result) => console.log(findElf(result))); //load the processed data, add each elfs snack's calorie values, find the biggest calorie sum and return its index.