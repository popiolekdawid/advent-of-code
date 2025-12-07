async function fetchData(filename: string) {
  try {
    const text = await Deno.readTextFile(filename);

    const result = text.split(/\n\n/)[0].split("\n");

    return result;
  } catch (err) {
    console.log(err);
  }
}

function processData(data: string[]) {
  let count = 0;
  let position = 50;

  console.log(`The dial starts by pointing at ${position}.`);

  data.forEach(instruction => {
    const direction = instruction[0];
    const amount = parseInt(instruction.slice(1)) % 100;

    if(direction === 'R') {
      position += amount
    } else if (direction === 'L') {
      position -= amount
    }

    if(position < 0) {
      position = 100 + position;
    } else if(position > 99) {
      position = position - 100;
    }

    if(position === 0) count++;

    console.log(`The dial is rotated ${direction}${amount} to point at ${position}.`);
  });

  return count;
}

if (import.meta.main) {
  const data = await fetchData("1/input.txt");
  
  if (!data) {
    console.log("No data found");
    Deno.exit(1);
  }

  const result = processData(data);
  console.log("How many times has the dial pointed at 0? ", result);
}
