// Handle authentication
function handleAuth() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const storedUser = localStorage.getItem(username);

    if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
            alert("Login Successful");
            document.getElementById("authContainer").style.display = 'none';
            document.getElementById("mainContent").style.display = 'block';
        } else {
            alert("Incorrect password, please try again.");
        }
    } else {
        const user = { username: username, password: password };
        localStorage.setItem(username, JSON.stringify(user));
        alert("Account created successfully! Please log in.");
    }
}

// To-Do List Functionality
function addTodo() {
    const todoInput = document.getElementById("todoInput").value;
    const todoList = document.getElementById("todoList");

    if (todoInput) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${todoInput} <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">✖</button>`;
        todoList.appendChild(li);
        saveTodoToLocalStorage(todoInput);
        document.getElementById("todoInput").value = "";
    }
}

function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    removeTodoFromLocalStorage(li.firstChild.textContent.trim());
}

function saveTodoToLocalStorage(task) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodoFromLocalStorage(task) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(t => t !== task);
    localStorage.setItem('todos', JSON.stringify(todos));
}

window.onload = function () {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(task => {
        const todoList = document.getElementById("todoList");
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${task} <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">✖</button>`;
        todoList.appendChild(li);
    });
};

// Create folder and update the dropdown
function createFolder() {
    const folderInput = document.getElementById("folderInput").value;
    const folderSelect = document.getElementById("folderSelect");
    const foldersDiv = document.getElementById("folders");

    if (folderInput) {
        const div = document.createElement("div");
        div.className = "folder";
        div.innerText = folderInput;
        foldersDiv.appendChild(div);

        // Create a new option for the select dropdown
        const option = document.createElement("option");
        option.value = folderInput;
        option.textContent = folderInput;
        folderSelect.appendChild(option);

        document.getElementById("folderInput").value = ""; // Clear input
    }
}
