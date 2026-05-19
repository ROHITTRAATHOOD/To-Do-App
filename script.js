const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const emptyState = document.getElementById("emptyState");

const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

renderTasks();

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
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
        completed:false
    };

    tasks.unshift(task);

    saveTasks();

    taskInput.value = "";

    renderTasks();
}

function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(currentFilter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }

    if(currentFilter === "pending"){
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(filteredTasks.length === 0){
        emptyState.style.display = "block";
    }else{
        emptyState.style.display = "none";
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task";

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

            <div class="task-actions">

                <button class="edit-btn" onclick="editTask(${task.id})">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

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

    saveTasks();

    renderTasks();
}

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
}

function editTask(id){

    const task = tasks.find(task => task.id === id);

    const updatedTask = prompt("Edit Task", task.text);

    if(updatedTask !== null && updatedTask.trim() !== ""){

        task.text = updatedTask;

        saveTasks();

        renderTasks();
    }
}

function updateStats(){

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = tasks.length - completed;
}

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
