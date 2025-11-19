

//question 1

const btn = document.getElementById("dropBtn");
const options = document.getElementById("options");

btn.onclick = () => {
  options.style.display = options.style.display === "block" ? "none" : "block";
};

options.onclick = e => {
  if (e.target.classList.contains("opt")) {
    btn.textContent = e.target.textContent;
    options.style.display = "none";
  }
};

document.addEventListener("click", () => {
  options.style.display = "none";
}, true);



//question 2

const box = document.getElementById("box");
const coords = document.getElementById("coords");

box.addEventListener("mousemove", e => {
  coords.textContent = "X: " + e.clientX + ", Y: " + e.clientY;
});

box.addEventListener("dblclick", e => {
  const rect = box.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const dot = document.createElement("div");
  dot.className = "dot";
  dot.style.left = x + "px";
  dot.style.top = y + "px";

  box.appendChild(dot);
});


//question 3

const input = document.getElementById("productInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("productList");
let editingItem = null;

addBtn.onclick = () => {
  if (!input.value.trim()) return;
  const li = document.createElement("li");
  li.innerHTML = `<span>${input.value}</span>
  <div>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  </div>`;
  list.appendChild(li);
  input.value = "";
};

list.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    e.target.closest("li").remove();
  } else if (e.target.classList.contains("edit")) {
    const li = e.target.closest("li");
    const span = li.querySelector("span");
    const value = span.textContent;
    const inputBox = document.createElement("input");
    inputBox.value = value;
    li.prepend(inputBox);
    span.style.display = "none";
    editingItem = { li, inputBox, span };
    inputBox.focus();
  }
});

document.addEventListener("click", e => {
  if (!editingItem) return;
  if (editingItem.li.contains(e.target)) return;
  editingItem.span.textContent = editingItem.inputBox.value;
  editingItem.span.style.display = "inline";
  editingItem.inputBox.remove();
  editingItem = null;
});



//question 4

const form = document.getElementById("myForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passInput = document.getElementById("passInput");

const nameErr = document.getElementById("nameErr");
const emailErr = document.getElementById("emailErr");
const passErr = document.getElementById("passErr");
const success = document.getElementById("success");

function validate() {
  let ok = true;

  if (!nameInput.value.trim()) {
    nameErr.textContent = "Name is required";
    ok = false;
  } else nameErr.textContent = "";

  if (!emailInput.value.includes("@")) {
    emailErr.textContent = "Invalid email";
    ok = false;
  } else emailErr.textContent = "";

  if (passInput.value.length < 6) {
    passErr.textContent = "Password must be 6+ chars";
    ok = false;
  } else passErr.textContent = "";

  return ok;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  if (validate()) {
    success.textContent = "Form Submitted Successfully";
    form.reset();
  }
});

[nameInput, emailInput, passInput].forEach(inp => {
  inp.addEventListener("input", () => {
    validate();
    success.textContent = "";
  });
});




//question 5

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const images = document.querySelectorAll(".img");

images.forEach(img => {
  img.onclick = () => {
    modal.style.display = "flex";
    modalImg.src = img.src.replace("200", "600");
  };
});

modal.onclick = () => modal.style.display = "none";

document.querySelector(".modal-content").onclick = e => {
  e.stopPropagation();
};



//question 6

// const box = document.getElementById("textBox");
const counter = document.getElementById("counter");
const resetBtn = document.getElementById("resetBtn");
let max = 100;

box.addEventListener("keydown", e => {
  if (box.value.length >= max && e.key.length === 1) e.preventDefault();
});

box.addEventListener("input", () => {
  let remaining = max - box.value.length;
  counter.textContent = remaining + " characters left";
  counter.style.color = remaining <= 0 ? "red" : remaining <= 20 ? "goldenrod" : "black";
});

resetBtn.onclick = () => {
  box.value = "";
  counter.textContent = "100 characters left";
  counter.style.color = "black";
};




//question 7

const steps = document.querySelectorAll(".step");
// const nameInput = document.getElementById("nameInput");
// const emailInput = document.getElementById("emailInput");
// const passInput = document.getElementById("passInput");
const sumName = document.getElementById("sumName");
const sumEmail = document.getElementById("sumEmail");
const sumPass = document.getElementById("sumPass");

function showStep(n) {
  steps.forEach(step => step.classList.remove("active"));
  steps[n].classList.add("active");
}

document.getElementById("next1").onclick = () => {
  if (nameInput.value.trim()) showStep(1);
};

document.getElementById("back2").onclick = () => showStep(0);
document.getElementById("next2").onclick = () => {
  if (emailInput.value.includes("@") && emailInput.value.includes(".")) showStep(2);
};

document.getElementById("back3").onclick = () => showStep(1);
document.getElementById("finish").onclick = () => {
  if (passInput.value.trim().length >= 3) {
    sumName.textContent = "Name: " + nameInput.value;
    sumEmail.textContent = "Email: " + emailInput.value;
    sumPass.textContent = "Password: " + passInput.value;
    showStep(3);
  }
};




//question 8

const search = document.getElementById("searchBox");
const rows = document.querySelectorAll("#tableBody tr");
const noResult = document.getElementById("noResult");

search.addEventListener("input", () => {
  const text = search.value.toLowerCase();
  let visibleCount = 0;

  rows.forEach(row => {
    const content = row.textContent.toLowerCase();
    if (content.includes(text)) {
      row.style.display = "";
      visibleCount++;
    } else {
      row.style.display = "none";
    }
  });

  noResult.style.display = visibleCount === 0 ? "block" : "none";
});





//question 9

const body = document.body;

document.getElementById("lightBtn").onclick = () => {
  body.setAttribute("data-theme", "light");
};

document.getElementById("darkBtn").onclick = () => {
  body.setAttribute("data-theme", "dark");
};

document.getElementById("blueBtn").onclick = () => {
  body.setAttribute("data-theme", "blue");
};
