const fs = require('fs');
const { emitKeypressEvents } = require('readline');

stacks1 = [
  ['Z','N'],
  ['M','C','D'],
  ['P']
]

stacks = [
    ['R', 'S', 'L', 'F', 'Q'],
    ['N', 'Z', 'Q', 'G', 'P', 'T'],
    ['S', 'M', 'Q', 'B'],
    ['T','G','Z','J','H','C','B','Q'],
    ['P','H','M','B','N','F','S'],
    ['P','C','Q','N','S','L','V','G'],
    ['W','C','F'],
    ['Q','H','G','Z','W','V','P','M'],
    ['G','Z','D','L','C','N','R']
]

async function processData(filename) {
  try {
    let results = fs
      .readFileSync(filename, "utf-8")
      .split(/\r?\n/)
      .map(s => s.split(" "))
    return results;
  } catch (err) {
    console.log(err);
  }
}

function findTop(data) {
  data.forEach(element => {
      const howMany = parseInt(element[1]);
      const origin = parseInt(element[3])-1;
      const destination = parseInt(element[5])-1;
      const len = stacks[origin].length;
      stacks[destination] = stacks[destination].concat(stacks[origin].slice(len-howMany,len));
      stacks[origin] = stacks[origin].slice(0,len-howMany);
  });
  let result = "";
  for(j in stacks){
    result += stacks[j][stacks[j].length-1];
  }
  return result;
}

const data = processData('./day5/data.txt');
data.then((result) => console.log(findTop(result)));