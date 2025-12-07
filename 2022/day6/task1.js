const fs = require('fs');
const data = fs.readFileSync('./day6/data.txt','utf8');

let packet = [ data[0], data[1], data[2], data[3]]; //initializing the packet, that will travel through the signal checking for uniqueness
let count = 4; //initialize with 4 because we need to take into account the length of the packet init. above^

for (let i = 4; i<data.length; i++) {
  if (!(packet.includes(data[i])) && (packet.length === new Set(packet).size)) {  //check if the new character is present in current packet and check if the characters in packet are different to eachoter.
    break;
  } else {
    packet.shift();   //throw out the first char of the packet
    packet.push(data[i]);   //add the current char to the end of the packet
    count++;
  }
}
console.log(count);