//there's a bug somwhere here, it doesn't seem to catch anything, even though it's almost the same as the previous answer.

const fs = require('fs');
const data = fs.readFileSync('./day6/data.txt','utf8');

let packet = [];
for(let i = 0; i<14; i++) {
  packet.push(data[i]);
}

let count = 14; //initialize with 4 because we need to take into account the length of the packet init. above^

for (let i = 14; i<data.length; i++) {
  if (!(packet.includes(data[i])) && (packet.length === new Set(packet).size)) {  //check if the new character is present in current packet and check if the characters in packet are different to eachoter.
    break;
  } else {
    packet.shift();   //throw out the first char of the packet
    packet.push(data[i]);   //add the current char to the end of the packet
    count++;
  }
}
console.log(packet);
console.log(new Set(packet));
console.log(count);