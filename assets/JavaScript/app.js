const wrapper = document.querySelector(".wrapper"),
  menuBtn = document.querySelector(".menu-btn"),
  backBtn = document.querySelector(".back-btn"),
  addTaskBtn = document.querySelector(".add-task-btn"),
  addTaskForm = document.querySelector(".add-task"),
  blackBackDrop = document.querySelector(".black-backdrop"),
  categorySelect = document.querySelector("#category-select"),
  cancelBtn = document.querySelector(".cancel-btn"),
  addBtn = document.querySelector(".add-btn"),
  taskInput = document.querySelector(".todo-input"),
  addTaskInput = document.getElementById("task-input"),
  categoriesContainer = document.querySelector(".categories"),
  categoryTitle = document.querySelector(".category-title"),
  totalCategoryTasks = document.querySelector(".category-tasks"),
  categoryImg = document.getElementById("category-img"),
  totalTasks = document.querySelector(".totalTasks"),
  tasksContainer = document.querySelector(".tasks"),
  errorMsg = document.querySelector(".error-message"),
  taskForm = document.getElementById("add-task-form"),
  doneTaskCounter = document.querySelector(".task-done");

//categories and tasks array for adding the into the category and task list
let categories = [
  {
    title: "Personal",
    img: "boy.png",
  },
  {
    title: "Work",
    img: "briefcase.png",
  },
  {
    title: "Shopping",
    img: "shopping.png",
  },
  {
    title: "Coding",
    img: "web-design.png",
  },
  {
    title: "Health",
    img: "healthcare.png",
  },
  {
    title: "Fitness",
    img: "dumbbell.png",
  },
  {
    title: "Education",
    img: "education.png",
  },
  {
    title: "Finance",
    img: "saving.png",
  },
];
let tasks = [
  {
    id: 1,
    task: "Go to market",
    category: "Shopping",
    completed: false,
  },
  {
    id: 2,
    task: "Read a chapter of a book",
    category: "Personal",
    completed: false,
  },
  {
    id: 3,
    task: "Prepare presentation for meeting",
    category: "Work",
    completed: false,
  },
  {
    id: 4,
    task: "Complete coding challenge",
    category: "Coding",
    completed: false,
  },
  {
    id: 5,
    task: "Take a 30-minute walk",
    category: "Health",
    completed: false,
  },
  {
    id: 6,
    task: "Do a 20-minute HIIT workout",
    category: "Fitness",
    completed: false,
  },
  {
    id: 7,
    task: "Watch an educational video online",
    category: "Education",
    completed: false,
  },
  {
    id: 8,
    task: "Review monthly budget",
    category: "Finance",
    completed: false,
  },
  {
    id: 9,
    task: "Buy groceries for the week",
    category: "Shopping",
    completed: false,
  },
  {
    id: 10,
    task: "Write in a journal",
    category: "Personal",
    completed: false,
  },
  {
    id: 11,
    task: "Send follow-up emails",
    category: "Work",
    completed: false,
  },
  {
    id: 12,
    task: "Work on a coding side project",
    category: "Coding",
    completed: false,
  },
  {
    id: 13,
    task: "Try a new healthy recipe",
    category: "Health",
    completed: false,
  },
  {
    id: 14,
    task: "Attend a yoga class",
    category: "Fitness",
    completed: false,
  },
  {
    id: 15,
    task: "Read an article about a new topic",
    category: "Education",
    completed: false,
  },
  {
    id: 16,
    task: "Set up automatic bill payments",
    category: "Finance",
    completed: false,
  },
  // Additional tasks for each category
  {
    id: 17,
    task: "Buy new clothes",
    category: "Shopping",
    completed: false,
  },
  {
    id: 18,
    task: "Meditate for 10 minutes",
    category: "Personal",
    completed: false,
  },
  {
    id: 19,
    task: "Prepare agenda for team meeting",
    category: "Work",
    completed: false,
  },
  {
    id: 20,
    task: "Debug a software issue",
    category: "Coding",
    completed: false,
  },
  {
    id: 21,
    task: "Try a new recipe for lunch",
    category: "Health",
    completed: false,
  },
  {
    id: 22,
    task: "Go for a run",
    category: "Fitness",
    completed: false,
  },
  {
    id: 23,
    task: "Learn a new language online",
    category: "Education",
    completed: false,
  },
  {
    id: 24,
    task: "Read about history",
    category: "Education",
    completed: false,
  },
  {
    id: 25,
    task: "Review investment portfolio",
    category: "Finance",
    completed: false,
  },
  // Add more tasks for each category as desired
];

//switch between the home-screen and category-screen sections
const toggleScreen = () => {
  wrapper.classList.toggle("show-category");
};
//toggle the backDrop and addTaskForm
const toggleAddTaskForm = () => {
  addTaskForm.classList.toggle("active");
  blackBackDrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};
let selectedCategory = categories[0];
//calculate the total category tasks
const calculateTotal = () => {
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  totalCategoryTasks.textContent = `${categoryTasks.length} Tasks`;
  console.log(categoryTasks);

  totalTasks.textContent = tasks.length;
};
//add the task to the task list
const addTask = () => {
  const category = categorySelect.value;
  const task = taskInput.value.trim();
  const newTask = {
    id: tasks.length + 1,
    task,
    category,
    completed: false,
  };

  taskInput.value = " ";
  tasks.push(newTask);
  saveLocal();
  toggleAddTaskForm();
  renderTasks();
};
//rendering the category cards
const renderCategories = () => {
  categoriesContainer.innerHTML = "";

  categories.forEach((category) => {
    const categoryTasks = tasks.filter(
      (task) => task.category.toLowerCase() == category.title.toLowerCase()
    );
    createCategoryCard(category, categoryTasks);
  });
};
// creating the category cards
const createCategoryCard = (category, categoryTasks) => {
  const div = document.createElement("div");
  div.classList.add("category");
  div.addEventListener("click", () => {
    wrapper.classList.add("show-category");
    selectedCategory = category;
    categoryImg.src = `./assets/Images/${category.img}`;
    categoryTitle.textContent = category.title;
    calculateTotal();
    renderTasks();
  });
  div.innerHTML = ` 
  <div class="left">
    <img src="./assets/Images/${category.img}" alt=${category.title} class="category-img"/>
    <div class="content">
      <h1>${category.title}</h1>
      <p>${categoryTasks.length} Tasks</p>
    </div>
  </div>
  <div class="options">
    <div class="toggle-btn">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
        >
        <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
        </svg>
    </div>
  </div>
  `;

  categoriesContainer.appendChild(div);
};
// creating the categories tasks
const createCategoryTask = (task, allTask, categoryTasks) => {
  const div = document.createElement("div");
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  div.classList.add("task-wrapper");
  label.classList.add("task");
  checkBox.classList.add("task-check");
  label.setAttribute("for", task.id);
  checkBox.type = "checkbox";
  checkBox.id = task.id;
  checkBox.checked = task.completed;
  const completedTasks = categoryTasks.filter(
    (task) => task.completed === true
  );
  doneTaskCounter.textContent = `${completedTasks.length} task is done`;

  checkBox.addEventListener("change", () => {
    const index = allTask.findIndex((wantedTask) => wantedTask.id === task.id);

    allTask[index].completed = !allTask[index].completed;
    saveLocal();
  });
  div.innerHTML = `
    <div class="delete-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon"
        viewBox="0 0 512 512"
      >
        <path
          d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="32"
          d="M80 112h352"
        />
        <path
          d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
      </svg>
  </div>
  `;
  label.innerHTML = `
    <span class="checkmark">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon"
        viewBox="0 0 512 512">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="M416 128L192 384l-96-96"
        />
      </svg>
    </span>
    <p>${task.task}</p>
  `;

  label.prepend(checkBox);
  div.prepend(label);
  tasksContainer.appendChild(div);

  deleteTask(div, allTask, task);
};
//rendering the each category tasks
const renderTasks = () => {
  tasksContainer.innerHTML = "";

  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() == selectedCategory.title.toLowerCase()
  );
  totalCategoryTasks.textContent = `${categoryTasks.length} Tasks`;
  totalTasks.textContent = tasks.length;

  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = ` <p class="no-task">No tasks for this category</p>  `;
  } else {
    categoryTasks.forEach((task) => {
      createCategoryTask(task, tasks, categoryTasks);
    });
    renderCategories();
  }
};
// delete task from category tasks list
const deleteTask = (taskDiv, allTask, task) => {
  const deleteBtn = taskDiv.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    const index = allTask.findIndex((wantedTask) => wantedTask.id === task.id);
    allTask.splice(index, 1);

    saveLocal();
    getLocal();
    renderTasks();
    renderCategories();
    calculateTotal();
  });
};
//saving the tasks in Local Storage
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
// getting the tasks in Local Storage
const getLocal = () => {
  const localTasks = JSON.parse(localStorage.getItem("tasks"));
};
//adding the error message to the input
const setError = (element, message) => {
  errorMsg.textContent = message;
  element.classList.add("error-border");
};
//removing the error message when task is added
const setSuccess = (element) => {
  errorMsg.textContent = "";
  element.classList.remove("error-border");
};
//validation of input
const validateInput = () => {
  const taskVal = taskInput.value.trim();

  if (taskVal.length === 0 || taskVal === null) {
    setError(taskInput, "task is required");
  } else {
    setSuccess(taskInput);
  }
};
//check for form is valid or not
const isFormValid = () => {
  const inputContainer = taskForm.querySelector(".todo-input");
  let valid = true;
  if (inputContainer.classList.contains("error-border")) {
    valid = false;
  }
  return valid;
};
// Event handlers
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validateInput();

  if (isFormValid() == true) {
    addTask();
  }
});
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();

  setSuccess(taskInput);
  toggleAddTaskForm();
});
addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();

  setSuccess(taskInput);
  toggleAddTaskForm();
});
backBtn.addEventListener("click", toggleScreen);
menuBtn.addEventListener("click", toggleScreen);
getLocal();
renderTasks();

categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title.toLowerCase();
  option.textContent = category.title;
  categorySelect.appendChild(option);
});
