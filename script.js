const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = [];

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    addTask();
  }
});

function addTask(){

  const taskText = taskInput.value.trim();

  if(taskText === ""){
    alert("Please enter a task");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);

  taskInput.value = "";

  renderTasks();
}

function renderTasks(){

  taskList.innerHTML = "";

  tasks.forEach(task => {

    const li = document.createElement("li");
    li.classList.add("task-item");

    li.innerHTML = `
      <div class="task-left">
        <input 
          type="checkbox" 
          ${task.completed ? "checked" : ""}
          onchange="toggleTask(${task.id})"
        >

        <span class="task-text ${task.completed ? "completed" : ""}">
          ${task.text}
        </span>
      </div>

      <button class="delete-btn" onclick="deleteTask(${task.id})">
        Delete
      </button>
    `;

    taskList.appendChild(li);
  });

  updateStats();
}

function toggleTask(id){

  tasks = tasks.map(task => {

    if(task.id === id){
      task.completed = !task.completed;
    }

    return task;
  });

  renderTasks();
}

function deleteTask(id){

  tasks = tasks.filter(task => task.id !== id);

  renderTasks();
}

function updateStats(){

  totalTasks.textContent = tasks.length;

  const completed = tasks.filter(task => task.completed).length;

  completedTasks.textContent = completed;

  pendingTasks.textContent = tasks.length - completed;
}
