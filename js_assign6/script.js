


// question 1

function boilWater() {
  return new Promise((done, fail) => {
    let time = 1000 + Math.random() * 1000;
    setTimeout(() => {
      if (Math.random() > 0.2) {
        console.log("Water is hot now");
        done();
      } else {
        fail("Water didn't boil right");
      }
    }, time);
  });
}

function makeCoffee() {
  return new Promise((done, fail) => {
    let time = 1000 + Math.random() * 1000;
    setTimeout(() => {
      if (Math.random() > 0.2) {
        console.log("Coffee made");
        done();
      } else {
        fail("Coffee messed up");
      }
    }, time);
  });
}

function pourIt() {
  return new Promise((done, fail) => {
    let time = 1000 + Math.random() * 1000;
    setTimeout(() => {
      if (Math.random() > 0.2) {
        console.log("In the cup");
        done();
      } else {
        fail("Spilled it");
      }
    }, time);
  });
}

boilWater()
.then(() => makeCoffee())
.then(() => pourIt())
.then(() => console.log("Got coffee for everyone!"))
.catch(err => console.log("Oops:", err));

//--------------------------------------------------------------------------------------------------------------------------------


// question 2
console.log("Starting here");

setTimeout(() => {
  console.log("This is timeout");
}, 0);

Promise.resolve().then(() => console.log("This is promise"));

console.log("Ending here");

//--------------------------------------------------------------------------------------------------------------------------------



// question 3
function getBugs() {
  return new Promise((good, bad) => {
    let works = Math.random() > 0.3;
    setTimeout(() => {
      if (works) {
        good(["Button broken", "Page slow", "Login issue"]);
      } else {
        bad("API broke");
      }
    }, 1000);
  });
}

getBugs()
.then(bugs => {
  console.table(bugs);
})
.catch(err => console.log("Error happened:", err));

//--------------------------------------------------------------------------------------------------------------------------------



// question 4

function server1() {
  return new Promise((yes, no) => {
    setTimeout(() => {
      Math.random() > 0.2 ? yes("Server 1 done") : no("Server 1 broke");
    }, 2000);
  });
}

function server2() {
  return new Promise((yes, no) => {
    setTimeout(() => {
      Math.random() > 0.2 ? yes("Server 2 done") : no("Server 2 broke");
    }, 3000);
  });
}

Promise.all([server1(), server2()])
.then(() => console.log("Both servers good"))
.catch(err => console.log("Something broke:", err));

Promise.race([server1(), server2()])
.then(winner => console.log("First one:", winner))
.catch(err => console.log("First one broke:", err));

//--------------------------------------------------------------------------------------------------------------------------------




// question 5

function messyWay() {
  setTimeout(() => {
    console.log("1. Design done");
    setTimeout(() => {
      console.log("2. Build done");
      setTimeout(() => {
        console.log("3. Test done");
        setTimeout(() => {
          console.log("4. Deploy done");
          setTimeout(() => {
            console.log("5. Party time!");
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

async function cleanWay() {
  function doStep(num, name) {
    return new Promise(done => {
      setTimeout(() => {
        console.log(num + ". " + name);
        done();
      }, 1000);
    });
  }

  await doStep(1, "Design done");
  await doStep(2, "Build done");
  await doStep(3, "Test done");
  await doStep(4, "Deploy done");
  await doStep(5, "Party time!");
}

//--------------------------------------------------------------------------------------------------------------------------------




// question 6

async function showProducts() {
  try {
    let response = await fetch('https://fakestoreapi.com/products');
    let products = await response.json();
    
    products.forEach(item => {
      console.log("Product: " + item.title);
      console.log("Price: $" + item.price);
      console.log("Image: " + item.image);
      console.log("---");
    });
    let container = document.createElement('div');
    products.forEach(product => {
      let card = document.createElement('div');
      card.innerHTML = `
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <img src="${product.image}" width="100">
      `;
      container.appendChild(card);
    });
    document.body.appendChild(container);
    
  } catch {
    console.log("Couldn't load products");
  }
}

showProducts();

//--------------------------------------------------------------------------------------------------------------------------------





// question 7

function loadProfile() {
  return new Promise((y, n) => {
    setTimeout(() => {
      Math.random() > 0.3 ? y("Profile good") : n("Profile bad");
    }, 2000);
  });
}

function loadPosts() {
  return new Promise((y, n) => {
    setTimeout(() => {
      Math.random() > 0.3 ? y("Posts good") : n("Posts bad");
    }, 1500);
  });
}

function loadMessages() {
  return new Promise((y, n) => {
    setTimeout(() => {
      Math.random() > 0.3 ? y("Messages good") : n("Messages bad");
    }, 1000);
  });
}

async function loadAll() {
  let start = Date.now();
  
  let results = await Promise.allSettled([
    loadProfile(), 
    loadPosts(), 
    loadMessages()
  ]);
  
  results.forEach((result, i) => {
    let names = ['Profile', 'Posts', 'Messages'];
    console.log(names[i] + ": " + result.status);
  });
  
  console.log("Took " + (Date.now() - start) + "ms");
}

loadAll();

//--------------------------------------------------------------------------------------------------------------------------------




// question 8

function submitOrder() {
  return new Promise((y, n) => {
    setTimeout(() => {
      Math.random() > 0.5 ? y() : n();
    }, 1000);
  });
}

async function processOrder() {
  for (let i = 1; i <= 3; i++) {
    try {
      await submitOrder();
      console.log("Try " + i + ": Worked");
      return;
    } catch {
      console.log("Try " + i + ": Failed");
    }
  }
  throw new Error("Order totally failed");
}

processOrder().catch(err => console.log(err.message));

//--------------------------------------------------------------------------------------------------------------------------------




// question 9

console.log("Script start");

setTimeout(() => console.log("Timeout thing"), 0);

Promise.resolve().then(() => console.log("Promise thing"));

console.log("Script end");

//--------------------------------------------------------------------------------------------------------------------------------




// question 10
function doStep(stepNum, stepName) {
  return new Promise((y, n) => {
    let time = 1000 + Math.random() * 1000;
    setTimeout(() => {
      if (Math.random() > 0.2) {
        console.log("Step " + stepNum + ": " + stepName);
        y();
      } else {
        n("Failed at step " + stepNum);
      }
    }, time);
  });
}

async function runDelivery() {
  try {
    console.log("Starting delivery");
    await doStep(1, "Order taken");
    await doStep(2, "Food made");
    await doStep(3, "Packed up");
    await doStep(4, "Out for delivery");
    await doStep(5, "Delivered!");
  } catch (err) {
    console.log("Delivery failed!", err);
  }
}

runDelivery();
//--------------------------------------------------------------------------------------------------------------------------------
