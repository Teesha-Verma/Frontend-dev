// question 1
let scores = Array.from({length: 8}, () => Math.floor(Math.random() * 71) + 30);

let highest = Math.max(...scores);
let lowest = Math.min(...scores);
let average = scores.reduce((a, b) => a + b) / scores.length;
let passed = scores.filter(s => s >= 50).length;

console.log(`
Scores: ${scores}
Highest: ${highest}
Lowest: ${lowest}
Average: ${average.toFixed(2)}
Passed Students: ${passed}
`);


// question 2
let isDoorLocked = true;
let isWindowClosed = true;
let isAlarmOn = true;
let isOwnerInside = true;

function checkSecurity() {
  let secure = isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside;
  console.log(secure ? "Secure" : "Unsafe");
}

checkSecurity();

isOwnerInside = false;
checkSecurity();

isOwnerInside = true;
isAlarmOn = false;
checkSecurity();