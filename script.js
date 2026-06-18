
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const pendingCount = document.getElementById('pendingCount');

let tasks = [];
function loadTasks() {
    const savedTasks = localStorage.getItem('todo_tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}


function updateCounter() {
    const pending = tasks.filter(task => !task.completed).length;
    pendingCount.textContent = pending;
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = task.text;
        
        if (task.completed) {
            span.classList.add('completed');
        }

        span.addEventListener('click', function() {
            tasks[index].completed = !tasks[index].completed;
            saveToLocalStorage();
            renderTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('delete-btn');
        
        deleteBtn.addEventListener('click', function() {
            tasks.splice(index, 1);
            saveToLocalStorage();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    });

    updateCounter();
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Por favor, digite uma tarefa!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveToLocalStorage();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

loadTasks();