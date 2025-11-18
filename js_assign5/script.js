

// question 1

function greetUser(name, callback) {
    console.log("Hello" + name);
    callback();
}

function showEndMessage() {
    console.log("Welcome !!!");
}


greetUser("XYZ", showEndMessage);

//--------------------------------------------------------------------------------------------------------------------------------




// question 2

function applyOperation(numbers, operation) {
    let result = [];
    for (let i = 0; i < numbers.length; i++) {
        result.push(operation(numbers[i]));
    }
    return result;
}

let doubled = applyOperation([1,2,3], function(num) {
    return num * 2;
});
console.log("Doubled:", doubled);

let squared = applyOperation([1,2,3], function(num) {
    return num * num;
});
console.log("Squared:", squared);

//--------------------------------------------------------------------------------------------------------------------------------




// question 3


let user = {
    name: "ABC",
    showName: () => {
        console.log("Name:", this.name); // undefined
    }
};
user.showName();

// CORRECT 
let userFixed = {
    name: "ABC",
    showName: function() {
        console.log("Name:", this.name); 
    }
};
userFixed.showName();

//--------------------------------------------------------------------------------------------------------------------------------




// question 4

function Car(brand, model) {
    this.brand = brand;
    this.model = model;
}

Car.prototype.getDetails = function() {
    console.log(this.brand + " - " + this.model);
};

let car1 = new Car("HFHJKJ", "ABC");
let car2 = new Car("FIWJ", "KLM");

car1.getDetails();
car2.getDetails();

//--------------------------------------------------------------------------------------------------------------------------------




// question 5

function Person(name) {
    this.name = name;
}

Person.prototype.showName = function() {
    console.log("Name:", this.name);
};

function Student(name, branch) {
    Person.call(this, name);
    this.branch = branch;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.showBranch = function() {
    console.log("Branch:", this.branch);
};

let student1 = new Student("DEF", "CS");
student1.showName();
student1.showBranch();

//--------------------------------------------------------------------------------------------------------------------------------





// question 6

function Person(name) {
    this.name = name;
}

Person.prototype.introduce = function() {
    console.log("I am " + this.name);
};

function Faculty(name, department) {
    Person.call(this, name);
    this.department = department;
}

Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;

Faculty.prototype.showDept = function() {
    console.log("Department:", this.department);
};

function Professor(name, department, subject) {
    Faculty.call(this, name, department);
    this.subject = subject;
}

Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.teach = function() {
    console.log("Teaching " + this.subject);
};

let prof = new Professor("KLM", "CS", "JS");
prof.introduce();     // Person
prof.showDept();      // Faculty  
prof.teach();         // Professor

//--------------------------------------------------------------------------------------------------------------------------------





// question 7

function makeMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const triple = makeMultiplier(3);
console.log(triple(90)); 

//--------------------------------------------------------------------------------------------------------------------------------





// question 8

Array.prototype.myMap = function(callback) {
    let newArray = [];
    for (let i = 0; i < this.length; i++) {
        newArray.push(callback(this[i], i, this));
    }
    return newArray;
};

let result = [1,2,3,4].myMap(num => num * 2);
console.log(result);

//--------------------------------------------------------------------------------------------------------------------------------





// question 9

class Person {
    constructor(name) {
        this.name = name;
    }
    
    showName() {
        console.log("Name:", this.name);
    }
}

class Student extends Person {
    constructor(name, branch) {
        super(name);
        this.branch = branch;
    }
    
    showBranch() {
        console.log("Branch:", this.branch);
    }
}

let student = new Student("Sima", "ECE");
student.showName();
student.showBranch();

//--------------------------------------------------------------------------------------------------------------------------------
