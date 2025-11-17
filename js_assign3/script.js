// question 1
"use strict";

function showMessage() {
  let greeting = "Welcome";
  debugger;
  console.log(greeting);
}

showMessage();
// question 2
const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

const validNumbers = [];
const invalidNumbers = [];

for (let value of apiData) {
  const num = Number(value);
  const bool = Boolean(value);
  const str = String(value);

  const isValid = !isNaN(num) && value !== " " && value !== "NaN" && !String(value).includes("px");

  if (isValid) validNumbers.push(num);
  else invalidNumbers.push(value);

  console.log("Value:", value);
  console.log("Number:", num);
  console.log("Boolean:", bool);
  console.log("String:", str);
  console.log("Valid Number:", isValid);
  console.log("-------------------------");
}

console.log("Valid Numeric Data:", validNumbers);
console.log("Invalid Numeric Data:", invalidNumbers);
// question 3
"use strict";

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" }
];

for (let emp of employees) {
  try {
    if (!emp.name || !emp.salary || !emp.years) throw "Missing property";

    const salary = Number(emp.salary);
    const years = Number(emp.years);

    if (isNaN(salary) || isNaN(years)) throw "Invalid numeric data";

    const bonus = years > 3 ? salary * 0.1 : salary * 0.05;

    console.log(`
Employee: ${emp.name}
Salary: ${salary}
Years: ${years}
Bonus: ${bonus}
------------------------------`);
  } catch (err) {
    console.log(`Error for employee: ${emp.name || "Unknown"} → ${err}`);
  }
}
// question 4
"use strict";

try {
  console.log(score);
  announce();
  var score = 50;
  function announce() {
    console.log("Game started");
  }

  let status = "ready";
  startGame();
  function startGame() {
    console.log(status);
  }
} catch (err) {
  console.log("Original Error:", err);
}



function announceFixed() {
  console.log("Game started");
}

function startGameFixed(status) {
  console.log(status);
}

console.log("Fixed Run:");
var scoreFixed = 50;
announceFixed();
let statusFixed = "ready";
startGameFixed(statusFixed);


console.log("Arrow Function Run:");

var scoreArrow = 50;
const announceArrow = () => console.log("Game started");
const startGameArrow = (s) => console.log(s);

announceArrow();
let statusArrow = "ready";
startGameArrow(statusArrow);
// question 5
"use strict";

const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}'
];

const cleanData = [];
const errors = [];
const under18 = [];

for (let i = 0; i < rawData.length; i++) {
  const lineNo = i + 1;
  const entry = rawData[i];

  try {
    debugger;
    const parsed = JSON.parse(entry);

    if (!parsed.user || parsed.age === undefined) {
      throw new Error("Missing key(s): required keys are 'user' and 'age'");
    }

    const ageNum = Number(parsed.age);
    if (isNaN(ageNum)) throw new Error("Invalid age: not a number");

    const cleanEntry = { user: parsed.user, age: ageNum };
    cleanData.push(cleanEntry);

    if (ageNum < 18) under18.push(cleanEntry);

    console.log(`Line ${lineNo}: Parsed OK → ${JSON.stringify(cleanEntry)}`);
    debugger;
  } catch (err) {
    const errObj = { line: lineNo, raw: entry, error: String(err) };
    errors.push(errObj);
    console.log(`Line ${lineNo}: Error → ${errObj.error}`);
    debugger;
  }
}

console.log("\n--- Final Report ---");
console.log(`Total entries: ${rawData.length}`);
console.log(`Valid entries: ${cleanData.length}`);
console.log(`Errors: ${errors.length}`);
console.log("Clean Data:", cleanData);
console.log("Errors (detailed):", errors);
console.log("Under-18 users:", under18);
// question 6
"use strict";

console.log("Original Run:");
function outer() {
  debugger;
  console.log(count);
  var count = 5;
  function inner() {
    debugger;
    console.log(count);
    var count = 10;
  }
  inner();
}
outer();

console.log("\nFixed Version:");
function outerFixed() {
  debugger;
  let count = 5;
  function innerFixed() {
    debugger;
    let count = 10;
    console.log(count);
  }
  console.log(count);
  innerFixed();
}
outerFixed();

console.log("\nArrow Function Version:");
function outerArrow() {
  debugger;
  let count = 5;
  const innerArrow = () => {
    debugger;
    console.log(count);
  };
  console.log(count);
  innerArrow();
}
outerArrow();
// question 7
"use strict";

function getLimit() {
  var input = prompt("Enter pyramid size (default 5):");
  var n = Number(input);
  if (!input || isNaN(n) || n <= 0) {
    return 5;
  }
  return Math.floor(n);
}

var limit = getLimit();

console.log("Generate pyramid sample (each line shows stars separated by space)");
console.log("Outer loop limit:", limit);

console.log("\nSynchronous pyramid (using let):");
(function() {
  for (let i = 1; i <= limit; i++) {
    let line = "";
    for (let j = 1; j <= i; j++) {
      line += "* ";
    }
    console.log(line.trim());
    debugger;
  }
})();

console.log("\nSynchronous pyramid (using var):");
(function() {
  for (var i = 1; i <= limit; i++) {
    var line = "";
    for (var j = 1; j <= i; j++) {
      line += "* ";
    }
    console.log(line.trim());
    debugger;
  }
})();

console.log("\nAsynchronous demonstration (shows differences when using let vs var in closures)");
(function() {
  console.log("-> Using let for loop counter (each timeout captures its own i):");
  for (let i = 1; i <= limit; i++) {
    (function(ii) {
      setTimeout(function() {
        var line = "";
        for (var k = 1; k <= ii; k++) {
          line += "* ";
        }
        console.log("let closure:", line.trim());
      }, ii * 100);
    })(i);
  }

  setTimeout(function() {
    console.log("-> Using var for loop counter (timeouts capture same i, shows reuse issue):");
    for (var i = 1; i <= limit; i++) {
      setTimeout(function() {
        var line = "";
        for (var k = 1; k <= i; k++) {
          line += "* ";
        }
        console.log("var closure:", line.trim());
      }, i * 100);
    }
  }, (limit + 1) * 150);
})();
// question 8
"use strict";

const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

function calculate(op, a, b) {
  switch (op) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "divide":
      if (b === 0) throw "DivideByZeroError";
      return a / b;
    case "power":
      return a ** b;
    case "root":
      if (a < 0) throw "NegativeRootError";
      return Math.sqrt(a);
    default:
      throw "InvalidOperationError";
  }
}

for (let op of operations) {
  try {
    const result = calculate(op, num1, num2);
    console.log(`
Operation: ${op}
Result: ${result}
-------------------------`);
  } catch (err) {
    console.log(`
Operation: ${op}
Error: ${err}
-------------------------`);
  }
}
// question 9
// console.log("Non-Strict Mode Run:");
// function demoNonStrict(a, a) {
//   total = 10;
//   try { delete total; } catch (e) { console.log("Delete error:", e); }
//   console.log("total =", total);
// }
// try {
//   demoNonStrict(5, 10);
// } catch (e) {
//   console.log("Non-Strict Error:", e);
// }

// console.log("\nStrict Mode Run:");
// "use strict";
// function demoStrict(a, a) {
//   total = 10;
//   delete total;
// }
// try {
//   demoStrict(5, 10);
// } catch (e) {
//   console.log("Strict Error:", e);
// }

// console.log("\nES6 Correct Version:");
// function demoFixed(x, y) {
//   let total = 10;
//   console.log("total =", total);
// }
// demoFixed(5, 10);
// question 10
"use strict";

const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];

const valid = [];
const invalid = [];

for (let t of transactions) {
  try {
    debugger;

    if (t === null) throw "Null transaction";
    if (!t.id || t.amount === undefined) throw "Missing id or amount";
    if (t.amount < 0) throw "Negative amount";

    valid.push(t);
  } catch (err) {
    invalid.push({ transaction: t, error: err });
  }
}

console.log("Valid Transactions:", valid);
console.log("Invalid Transactions:", invalid);
console.log("Count → Valid:", valid.length, "| Invalid:", invalid.length);
