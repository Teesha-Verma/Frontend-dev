// college timetable viewer

const daySelector = document.getElementById("day-selector");
const tableContainer = document.getElementById("table-container");
const scheduleBody = document.getElementById("schedule-body");
const noClassesMsg = document.getElementById("no-classes-msg");

const API_URL = "http://localhost:3000/timetable";

daySelector.addEventListener("change", (e) => {
  const day = e.target.value;
  fetchSchedule(day);
});

function fetchSchedule(day) {
  fetch(`${API_URL}?day=${day}`)
    .then((response) => response.json())
    .then((data) => renderSchedule(data))
    .catch((error) => console.error("Error:", error));
}

function renderSchedule(data) {
  scheduleBody.innerHTML = "";

  if (data.length === 0) {
    tableContainer.classList.add("hidden");
    noClassesMsg.classList.remove("hidden");
  } else {
    noClassesMsg.classList.add("hidden");
    tableContainer.classList.remove("hidden");

    data.forEach((classItem) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td style="font-weight:bold; color:#555;">${classItem.time}</td>
                <td style="color:#2c3e50;">${classItem.subject}</td>
                <td style="color:#7f8c8d;">${classItem.faculty}</td>
            `;
      scheduleBody.appendChild(row);
    });
  }
}

// employee status dashboard

// const API_URL = "http://localhost:3000/employees";
const listContainer = document.getElementById("employee-list");
const errorBox = document.getElementById("error-box");

function fetchEmployees() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const employees = JSON.parse(xhr.responseText);
      renderEmployees(employees);
    } else {
      showError("Failed to load employees.");
    }
  };

  xhr.onerror = function () {
    showError("Network error while fetching data.");
  };

  xhr.send();
}

function renderEmployees(employees) {
  listContainer.innerHTML = "";

  employees.forEach((emp) => {
    const li = document.createElement("li");
    li.className = "employee-card";

    const isActive = emp.status === "active";

    li.innerHTML = `
            <div class="emp-info">
                <span class="emp-name">${emp.name}</span>
                <span class="emp-status ${
                  isActive ? "status-active" : "status-inactive"
                }" id="status-text-${emp.id}">
                    ${isActive ? "Active" : "Inactive"}
                </span>
            </div>
            <label class="switch">
                <input type="checkbox" id="toggle-${emp.id}" ${
      isActive ? "checked" : ""
    }>
                <span class="slider"></span>
            </label>
        `;

    listContainer.appendChild(li);

    const toggleInput = li.querySelector(`#toggle-${emp.id}`);
    toggleInput.addEventListener("change", () =>
      handleToggle(emp.id, toggleInput)
    );
  });
}

function handleToggle(id, checkbox) {
  const isChecked = checkbox.checked;
  const newStatus = isChecked ? "active" : "inactive";
  const statusTextEl = document.getElementById(`status-text-${id}`);

  updateUIStatus(statusTextEl, isChecked);
  hideError();

  const xhr = new XMLHttpRequest();
  xhr.open("PATCH", `${API_URL}/${id}`);
  xhr.setRequestHeader("Content-Type", "application/json");

  const payload = JSON.stringify({ status: newStatus });

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(`ID ${id} updated to ${newStatus}`);
    } else {
      revertUI(checkbox, statusTextEl, !isChecked);
      showError(`Server Error: Could not update ${id}.`);
    }
  };

  xhr.onerror = function () {
    revertUI(checkbox, statusTextEl, !isChecked);
    showError("Network Error: Request failed.");
  };

  xhr.send(payload);
}

function updateUIStatus(element, isActive) {
  element.textContent = isActive ? "Active" : "Inactive";
  if (isActive) {
    element.classList.remove("status-inactive");
    element.classList.add("status-active");
  } else {
    element.classList.remove("status-active");
    element.classList.add("status-inactive");
  }
}

function revertUI(checkbox, statusTextEl, originalState) {
  checkbox.checked = originalState;
  updateUIStatus(statusTextEl, originalState);
}

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.style.display = "block";
  setTimeout(() => {
    errorBox.style.display = "none";
  }, 3000);
}

function hideError() {
  errorBox.style.display = "none";
}

fetchEmployees();


// multi api dashboard

const usersEl = document.getElementById("users-count");
const ordersEl = document.getElementById("orders-count");
const productsEl = document.getElementById("products-count");
const errorBanner = document.getElementById("error-banner");

const API_BASE = "http://localhost:3000";

function loadDashboard() {
  const usersPromise = fetch(`${API_BASE}/users`).then((res) => {
    if (!res.ok) throw new Error("Users failed");
    return res.json();
  });

  const ordersPromise = fetch(`${API_BASE}/orders`).then((res) => {
    if (!res.ok) throw new Error("Orders failed");
    return res.json();
  });

  const productsPromise = fetch(`${API_BASE}/products`).then((res) => {
    if (!res.ok) throw new Error("Products failed");
    return res.json();
  });

  Promise.all([usersPromise, ordersPromise, productsPromise])
    .then(([users, orders, products]) => {
      updateCard(usersEl, users.length);
      updateCard(ordersEl, orders.length);
      updateCard(productsEl, products.length);
    })
    .catch((err) => {
      console.error(err);
      errorBanner.style.display = "block";

      removeSkeleton(usersEl);
      removeSkeleton(ordersEl);
      removeSkeleton(productsEl);

      usersEl.textContent = "-";
      ordersEl.textContent = "-";
      productsEl.textContent = "-";
    });
}

function updateCard(element, value) {
  removeSkeleton(element);
  element.textContent = value;
}

function removeSkeleton(element) {
  element.classList.remove("skeleton");
}

loadDashboard();


// real time live search 

$(document).ready(function () {
  $("#search-box").on("keyup", function () {
    let query = $(this).val().toLowerCase().trim();
    let resultsDiv = $("#results");
    let loader = $("#loader");

    if (query === "") {
      resultsDiv.empty();
      loader.hide();
      return;
    }

    $.ajax({
      url: "db.json",
      type: "GET",
      dataType: "json",
      data: { q: query },

      beforeSend: function () {
        loader.show();
        resultsDiv.empty();
      },

      success: function (data) {
        loader.hide();
        let found = false;

        let filteredData = data.filter((item) =>
          item.name.toLowerCase().includes(query)
        );

        if (filteredData.length > 0) {
          $.each(filteredData, function (key, product) {
            let html = `
                            <div class="product-card">
                                <img src="${product.image}" alt="${product.name}">
                                <div class="product-info">
                                    <h4>${product.name}</h4>
                                    <p class="price">$${product.price}</p>
                                </div>
                            </div>
                        `;
            resultsDiv.append(html);
          });
        } else {
          resultsDiv.html('<p class="no-results">No products found.</p>');
        }
      },

      error: function () {
        loader.hide();
        resultsDiv.html(
          '<p style="color:red; text-align:center;">Error loading data.</p>'
        );
      },
    });
  });
});


// task manager with filter

$(document).ready(function () {
  const API_URL = "http://localhost:3000/tasks";

  function fetchTasks(filters = {}) {
    $.ajax({
      url: API_URL,
      method: "GET",
      data: filters,
      success: function (tasks) {
        renderList(tasks);
      },
      error: function () {
        alert("Error loading tasks");
      },
    });
  }

  function renderList(tasks) {
    const $list = $("#task-list");
    $list.empty();

    if (tasks.length === 0) {
      $list.append('<li style="justify-content:center;">No tasks found</li>');
      return;
    }

    tasks.forEach((task) => {
      const isChecked = task.completed ? "checked" : "";
      const textClass = task.completed ? "completed-text" : "";

      const html = `
                <li>
                    <div class="task-info">
                        <input type="checkbox" class="toggle-task" data-id="${task.id}" ${isChecked}>
                        <span class="${textClass}">${task.title}</span>
                    </div>
                    <span class="badge ${task.priority}">${task.priority}</span>
                </li>
            `;
      $list.append(html);
    });
  }

  $("#filter-dropdown").on("change", function () {
    const value = $(this).val();
    let params = {};

    if (value === "completed") {
      params.completed = true;
    } else if (value !== "") {
      params.priority = value;
    }

    fetchTasks(params);
  });

  $(document).on("change", ".toggle-task", function () {
    const id = $(this).data("id");
    const isCompleted = $(this).is(":checked");
    const $textSpan = $(this).next("span");

    if (isCompleted) {
      $textSpan.addClass("completed-text");
    } else {
      $textSpan.removeClass("completed-text");
    }

    $.ajax({
      url: `${API_URL}/${id}`,
      method: "PATCH",
      data: { completed: isCompleted },
      error: function () {
        alert("Failed to update task");
        $(this).prop("checked", !isCompleted);
      },
    });
  });

  fetchTasks();
});


// user registration with duplicate

const form = document.getElementById("reg-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submit-btn");
const msgBox = document.getElementById("msg-box");

// const API_URL = "http://localhost:3000/users";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  resetMessage();
  setLoading(true);

  try {
    const checkRes = await axios.get(API_URL, {
      params: { email: email },
    });

    if (checkRes.data.length > 0) {
      showMessage("Email already registered.", "error");
    } else {
      await registerUser(name, email);
    }
  } catch (error) {
    showMessage("Network error. Please try again.", "error");
    console.error(error);
  } finally {
    setLoading(false);
  }
});

async function registerUser(name, email) {
  try {
    await axios.post(API_URL, {
      name: name,
      email: email,
    });
    showMessage("Registration successful!", "success");
    form.reset();
  } catch (error) {
    showMessage("Registration failed.", "error");
  }
}

function showMessage(text, type) {
  msgBox.textContent = text;
  msgBox.className = `message ${type}`;
  msgBox.style.display = "block";
}

function resetMessage() {
  msgBox.style.display = "none";
  msgBox.className = "message";
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.textContent = isLoading ? "Checking..." : "Register";
}