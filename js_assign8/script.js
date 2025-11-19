// question 1

class BankAccount {
  #balance;

  constructor(initialBalance = 0) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient balance");
    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount(1000);
acc.deposit(500);
console.log("Balance:", acc.getBalance());

try {
  acc.withdraw(2000);
} catch (e) {
  console.log("Error:", e.message);
}

console.log("Final Balance:", acc.getBalance());



// question 2

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 50000, stock: 3 },
  { id: 2, name: "Mouse", category: "Electronics", price: 700, stock: 15 },
  { id: 3, name: "Shoes", category: "Fashion", price: 2000, stock: 2 },
  { id: 4, name: "T-Shirt", category: "Fashion", price: 500, stock: 20 },
  { id: 5, name: "Book", category: "Education", price: 300, stock: 5 }
];

function getLowStockProducts() {
  return products.filter(p => p.stock < 5);
}

function sortProductsByPrice() {
  return [...products].sort((a, b) => a.price - b.price);
}

function calculateTotalInventoryValue() {
  return products.reduce((sum, p) => sum + p.price * p.stock, 0);
}

function groupByCategory() {
  return products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});
}

console.log("Low Stock:", getLowStockProducts());
console.log("Sorted by Price:", sortProductsByPrice());
console.log("Total Inventory Value:", calculateTotalInventoryValue());
console.log("Grouped by Category:", groupByCategory());




// question 3

class Employee {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }

  work() {
    return this.name + " works in " + this.department;
  }
}

class Manager extends Employee {
  work() {
    return this.name + " manages the " + this.department + " department";
  }
}

const e1 = new Employee("Shubham", "IT");
const m1 = new Manager("Saul", "Sales");

console.log(e1.work());
console.log(m1.work());




// question 4

class FitnessAnalytics {
  constructor(data) {
    if (!data.length) throw new Error("Dataset is empty");
    this.data = data;
  }

  getActiveUsers() {
    return this.data.filter(u => u.steps > 7000);
  }

  getAverageCalories() {
    return (
      this.data.reduce((sum, u) => sum + u.calories, 0) / this.data.length
    );
  }

  getUserSummary() {
    return this.data.map(
      u => u.user + " walked " + u.steps + " steps and burned " + u.calories
    );
  }
}

const workouts = [
  { user: "A", steps: 8000, calories: 300 },
  { user: "B", steps: 12000, calories: 500 },
  { user: "C", steps: 4000, calories: 200 }
];

try {
  const fa = new FitnessAnalytics(workouts);

  console.log(fa.getActiveUsers());
  console.log(fa.getAverageCalories());
  console.log(fa.getUserSummary());
} catch (e) {
  console.log("Error:", e.message);
}





// question 5

class MovieTicket {
  constructor(movieName, seatNo, price) {
    this.movieName = movieName;
    this.seatNo = seatNo;
    this.price = price;
  }
}

MovieTicket.prototype.printTicket = function () {
  return (
    "Movie: " +
    this.movieName +
    ", Seat: " +
    this.seatNo +
    ", Price: " +
    this.price
  );
};

class OnlineTicket extends MovieTicket {
  constructor(movieName, seatNo, price, convenienceFee) {
    super(movieName, seatNo, price);
    this.convenienceFee = convenienceFee;
  }

  getTotalAmount() {
    return this.price + this.convenienceFee;
  }
}

const t1 = new OnlineTicket("Inception", "A12", 250, 30);
const t2 = new OnlineTicket("Avatar 2", "B7", 300, 40);

console.log(t1.printTicket(), "Total:", t1.getTotalAmount());
console.log(t2.printTicket(), "Total:", t2.getTotalAmount());





// question 6

const menu = {
  burger: 120,
  pizza: 250,
  fries: 80,
  coke: 40
};

function calculateBill(orderItems) {
  const prices = orderItems.map(item => {
    if (!menu[item]) throw new Error(item + " is not available");
    return menu[item];
  });
  return prices.reduce((a, b) => a + b, 0);
}

try {
  const total = calculateBill(["burger", "pizza", "fries"]);
  console.log("Total Bill:", total);
} catch (e) {
  console.log("Error:", e.message);
}

try {
  const total2 = calculateBill(["burger", "icecream"]);
  console.log("Total Bill:", total2);
} catch (e) {
  console.log("Error:", e.message);
}




// question 7

function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.applyDiscount = function (percent) {
  return this.price - (this.price * percent) / 100;
};

const p1 = new Product("Laptop", 50000);
const p2 = new Product("Headphones", 2000);
const p3 = new Product("Keyboard", 1500);

console.log(p1.name, p1.applyDiscount(10));
console.log(p2.name, p2.applyDiscount(20));
console.log(p3.name, p3.applyDiscount(15));







// question 8

class User {
  constructor(name, rating) {
    this.name = name;
    this.rating = rating;
  }
}

class Driver extends User {
  constructor(name, rating, vehicle) {
    super(name, rating);
    this.vehicle = vehicle;
  }
}

class Trip {
  constructor(fromLocation, toLocation, distance) {
    this.fromLocation = fromLocation;
    this.toLocation = toLocation;
    this.distance = distance;
  }

  calculateFare() {
    if (this.distance === undefined || this.distance < 0) {
      throw new Error("Invalid trip distance");
    }
    return this.distance * 12;
  }
}

const user = new User("Shubham", 4.6);
const driver = new Driver("Saul", 4.9, "Swift Desire");
const trip = new Trip("Mumbai", "Pune", 150);

try {
  console.log("Fare:", trip.calculateFare());
} catch (e) {
  console.log("Error:", e.message);
}

const badTrip = new Trip("Delhi", "Gurgaon", -5);

try {
  console.log("Fare:", badTrip.calculateFare());
} catch (e) {
  console.log("Error:", e.message);
}









// question 9
class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  }

  calculateAverage() {
    return this.marks.reduce((a, b) => a + b, 0) / this.marks.length;
  }

  getGrade() {
    const avg = this.calculateAverage();
    if (avg >= 90) return "A";
    if (avg >= 75) return "B";
    if (avg >= 60) return "C";
    return "F";
  }
}

const s1 = new Student("Rahul", [90, 88, 92]);
const s2 = new Student("Aisha", [76, 81, 79]);
const s3 = new Student("Sam", [55, 60, 58]);

console.log(s1.name, s1.calculateAverage(), s1.getGrade());
console.log(s2.name, s2.calculateAverage(), s2.getGrade());
console.log(s3.name, s3.calculateAverage(), s3.getGrade());