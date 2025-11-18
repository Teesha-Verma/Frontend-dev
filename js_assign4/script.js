

// question 1

class FormBuilder {
  constructor(fields) {
    this.fields = fields
    this.container = document.getElementById("formContainer")
    this.renderForm()
  }

  renderForm() {
    let html = ""
    this.fields.forEach(f => {
      html += `<label>${f.label}</label>`
      html += `<input type="${f.type}" id="${f.label.replace(/ /g, '_')}" />`
    })
    this.container.innerHTML = html
  }

  getFormData() {
    const data = {}
    this.fields.forEach(f => {
      const id = f.label.replace(/ /g, "_")
      const value = document.getElementById(id).value
      data[f.label] = value
    })
    return data
  }
}

const fields = [
  { type: "text", label: "Username" },
  { type: "email", label: "Email" },
  { type: "password", label: "Password" }
]

const form = new FormBuilder(fields)

document.getElementById("submitBtn").addEventListener("click", () => {
  const data = form.getFormData()
  console.log("Form Data:", data)
  alert("Check console for submitted data")
})


// question 2

const user = { 
  name: "Akash",
  email: "akash@mail.com",
  age: 21
}

const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const ageInput = document.getElementById("age")
const output = document.getElementById("output")

nameInput.value = user.name
emailInput.value = user.email
ageInput.value = user.age

function displayUser() {
  output.innerHTML = 
    `Name: ${user.name}<br>Email: ${user.email}<br>Age: ${user.age}`
}

displayUser()

document.getElementById("updateBtn").addEventListener("click", () => {
  user.name = nameInput.value
  user.email = emailInput.value
  user.age = ageInput.value
  displayUser()
})

// question 3

class Product {
  constructor(id, name, price, category) {
    this.id = id
    this.name = name
    this.price = price
    this.category = category
  }

  applyDiscount(percent) {
    this.price = this.price - (this.price * percent / 100)
  }

  getDetails() {
    return `${this.id} - ${this.name} - ${this.price} - ${this.category}`
  }
}

const products = [
  new Product(1, "Laptop", 45000, "Electronics"),
  new Product(2, "Shoes", 1200, "Fashion"),
  new Product(3, "Watch", 900, "Accessories"),
  new Product(4, "Phone", 15000, "Electronics")
]

products.forEach(p => p.applyDiscount(10))

const filtered = products.filter(p => p.price > 1000)

console.log("Products with price > 1000:")
filtered.forEach(p => console.log(p.getDetails()))

// question 4

class Employee {
  constructor(id, name, department, salary) {
    this.id = id
    this.name = name
    this.department = department
    this.salary = salary
  }

  getAnnualSalary() {
    return this.salary * 12
  }

  applyBonus(percent) {
    this.salary = this.salary + (this.salary * percent / 100)
  }
}

const employees = [
  new Employee(1, "John", "HR", 30000),
  new Employee(2, "Asha", "Finance", 45000),
  new Employee(3, "Rohan", "IT", 50000),
  new Employee(4, "Megha", "Sales", 35000),
  new Employee(5, "Amit", "Marketing", 40000)
]

employees.forEach(e => e.applyBonus(10))

employees.forEach(e => {
  console.log(e.name, "Annual Salary:", e.getAnnualSalary())
})

const totalPayout = employees.reduce((sum, emp) => sum + emp.getAnnualSalary(), 0)

console.log("Total Annual Payout:", totalPayout)


// question 5

class Book {
  constructor(title, author, isbn, isIssued = false) {
    this.title = title
    this.author = author
    this.isbn = isbn
    this.isIssued = isIssued
  }

  issueBook() {
    if (!this.isIssued) {
      this.isIssued = true
      return true
    }
    return false
  }

  returnBook() {
    if (this.isIssued) {
      this.isIssued = false
      return true
    }
    return false
  }
}

const books = [
  new Book("The Alchemist", "Paulo Coelho", "101"),
  new Book("Atomic Habits", "James Clear", "102"),
  new Book("Dune", "Frank Herbert", "103"),
  new Book("Rich Dad Poor Dad", "Robert Kiyosaki", "104")
]

console.log("Available Books:")
books.filter(b => !b.isIssued).forEach(b => console.log(b.title))

function issueBookByISBN(isbn) {
  const book = books.find(b => b.isbn === isbn)
  if (!book) {
    console.log("Book not found")
    return
  }
  if (book.issueBook()) {
    console.log("Book issued:", book.title)
  } else {
    console.log("Book already issued")
  }
}

issueBookByISBN("102")


// question 6

const username = document.getElementById("username")
const password = document.getElementById("password")

const userError = document.getElementById("userError")
const passError = document.getElementById("passError")
const msg = document.getElementById("msg")

const usernameRegex = /^.{5,}$/
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/

document.getElementById("loginBtn").addEventListener("click", () => {
  let valid = true

  if (!usernameRegex.test(username.value)) {
    username.classList.add("invalid")
    username.classList.remove("valid")
    userError.textContent = "Username must be at least 5 characters"
    valid = false
  } else {
    username.classList.add("valid")
    username.classList.remove("invalid")
    userError.textContent = ""
  }

  if (!passwordRegex.test(password.value)) {
    password.classList.add("invalid")
    password.classList.remove("valid")
    passError.textContent = "Password must be 8+ chars with uppercase, lowercase, number, special character"
    valid = false
  } else {
    password.classList.add("valid")
    password.classList.remove("invalid")
    passError.textContent = ""
  }

  if (valid) {
    msg.style.color = "green"
    msg.textContent = "Login Successful"

    username.value = ""
    password.value = ""
    username.classList.remove("valid")
    password.classList.remove("valid")
  } else {
    msg.style.color = "red"
    msg.textContent = "Validation Failed"
  }
})


// question 7

const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const seatsInput = document.getElementById("seats")

const nameError = document.getElementById("nameError")
const emailError = document.getElementById("emailError")
const seatsError = document.getElementById("seatsError")

const ticketBox = document.getElementById("ticket")

const nameRegex = /^[A-Za-z ]+$/
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
const seatsRegex = /^([1-9]|10)$/

document.getElementById("bookBtn").addEventListener("click", () => {
  let valid = true

  if (!nameRegex.test(nameInput.value)) {
    nameInput.classList.add("invalid")
    nameInput.classList.remove("valid")
    nameError.textContent = "Only alphabets allowed"
    valid = false
  } else {
    nameInput.classList.add("valid")
    nameInput.classList.remove("invalid")
    nameError.textContent = ""
  }

  if (!emailRegex.test(emailInput.value)) {
    emailInput.classList.add("invalid")
    emailInput.classList.remove("valid")
    emailError.textContent = "Invalid email format"
    valid = false
  } else {
    emailInput.classList.add("valid")
    emailInput.classList.remove("invalid")
    emailError.textContent = ""
  }

  if (!seatsRegex.test(seatsInput.value)) {
    seatsInput.classList.add("invalid")
    seatsInput.classList.remove("valid")
    seatsError.textContent = "Seats must be 1 to 10 only"
    valid = false
  } else {
    seatsInput.classList.add("valid")
    seatsInput.classList.remove("invalid")
    seatsError.textContent = ""
  }

  if (valid) {
    const booking = {
      name: nameInput.value,
      email: emailInput.value,
      seats: seatsInput.value
    }

    ticketBox.style.display = "block"
    ticketBox.innerHTML =
      `<h3>Ticket Details</h3>
       Name: ${booking.name}<br>
       Email: ${booking.email}<br>
       Seats: ${booking.seats}`

    nameInput.value = ""
    emailInput.value = ""
    seatsInput.value = ""
    nameInput.classList.remove("valid")
    emailInput.classList.remove("valid")
    seatsInput.classList.remove("valid")
  }
})


// question 8

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
const urlRegex = /^https:\/\//

const emailError = document.getElementById("emailError")
const gitError = document.getElementById("gitError")
const linkError = document.getElementById("linkError")
const output = document.getElementById("output")

document.getElementById("submitBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const skills = document.getElementById("skills").value
  const github = document.getElementById("github").value
  const linkedin = document.getElementById("linkedin").value

  let valid = true

  if (!emailRegex.test(email)) {
    emailError.textContent = "Invalid email format"
    valid = false
  } else {
    emailError.textContent = ""
  }

  if (!urlRegex.test(github)) {
    gitError.textContent = "GitHub URL must start with https://"
    valid = false
  } else {
    gitError.textContent = ""
  }

  if (!urlRegex.test(linkedin)) {
    linkError.textContent = "LinkedIn URL must start with https://"
    valid = false
  } else {
    linkError.textContent = ""
  }

  if (!valid) return

  const resume = {
    name,
    email,
    skills: skills.split(",").map(s => s.trim()),
    github,
    linkedin
  }

  output.textContent = JSON.stringify(resume, null, 2)
})


// question 9


  applyCoupon(code) {
    const regex = /^(SAVE|DISC)(\d{1,2})$/
    const match = code.match(regex)
    if (!match) return { valid: false, discount: 0 }

    const discount = parseInt(match[2])
    return { valid: true, discount }
  }
}

const cart = new Cart()
const result = document.getElementById("result")

document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("itemName").value
  const price = Number(document.getElementById("itemPrice").value)
  const qty = Number(document.getElementById("itemQty").value)

  if (!name || !price || !qty) return

  cart.addItem(name, price, qty)

  document.getElementById("itemName").value = ""
  document.getElementById("itemPrice").value = ""
  document.getElementById("itemQty").value = ""

  result.innerHTML = "Item Added"
})

document.getElementById("checkBtn").addEventListener("click", () => {
  const coupon = document.getElementById("coupon").value
  const total = cart.getTotal()
  const applied = cart.applyCoupon(coupon)

  if (!applied.valid) {
    result.innerHTML = `Total: ₹${total}<br>Invalid Coupon`
    return
  }

  const discountAmount = total * (applied.discount / 100)
  const finalTotal = total - discountAmount

  result.innerHTML =
    `Total: ₹${total}<br>
     Discount: ${applied.discount}%<br>
     Final Total: ₹${finalTotal}`
})

// question 10

const form = document.getElementById("studentForm")

form.addEventListener("submit", function (e) {
  e.preventDefault()

  const name = document.getElementById("name")
  const email = document.getElementById("email")
  const phone = document.getElementById("phone")
  const password = document.getElementById("password")

  const nameError = document.getElementById("nameError")
  const emailError = document.getElementById("emailError")
  const phoneError = document.getElementById("phoneError")
  const passwordError = document.getElementById("passwordError")

  const nameRegex = /^[A-Za-z ]+$/
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  const phoneRegex = /^[0-9]{10}$/
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/

  let valid = true

  if (!nameRegex.test(name.value)) {
    name.classList.add("invalid")
    name.classList.remove("valid")
    nameError.textContent = "Only alphabets allowed"
    valid = false
  } else {
    name.classList.add("valid")
    name.classList.remove("invalid")
    nameError.textContent = ""
  }

  if (!emailRegex.test(email.value)) {
    email.classList.add("invalid")
    email.classList.remove("valid")
    emailError.textContent = "Invalid email format"
    valid = false
  } else {
    email.classList.add("valid")
    email.classList.remove("invalid")
    emailError.textContent = ""
  }

  if (!phoneRegex.test(phone.value)) {
    phone.classList.add("invalid")
    phone.classList.remove("valid")
    phoneError.textContent = "Phone must be exactly 10 digits"
    valid = false
  } else {
    phone.classList.add("valid")
    phone.classList.remove("invalid")
    phoneError.textContent = ""
  }

  if (!passwordRegex.test(password.value)) {
    password.classList.add("invalid")
    password.classList.remove("valid")
    passwordError.textContent = "Password must contain 1 uppercase, 1 number, and 1 special character"
    valid = false
  } else {
    password.classList.add("valid")
    password.classList.remove("invalid")
    passwordError.textContent = ""
  }

  if (valid) {
    alert("Form submitted successfully")
    form.reset()
    const inputs = form.querySelectorAll("input")
    inputs.forEach(i => {
      i.classList.remove("valid")
    })
  }
})