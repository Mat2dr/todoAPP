// Selectors
const messageHello = document.querySelector('.message');
const messageNbrTasks = document.querySelector('.nbr-tasks');
let nbrTasks = 0;

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// Event listeners
document.addEventListener('DOMContentLoaded', getName);
document.addEventListener('DOMContentLoaded', getTodos);
document.addEventListener('DOMContentLoaded', getNbrTasks);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions
function addTodo(event) {
    // Eviter de submit
    event.preventDefault();

    const todoDiv = document.createElement ('div');
    todoDiv.classList.add('todo');
    
    const newTodo = document.createElement ('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Local storage
    saveLocalTodos(todoInput.value);
    //number of tasks
    nbrTasks++;
    getNbrTasks();
    //check button
    const completedButton = document.createElement ('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement ('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // mettre dans ul
    todoList.appendChild(todoDiv);
    //Effacer input text
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target

    //Trash
    if(item.classList[0]=== 'trash-btn') {
        const todo =item.parentElement; //Select l'élément parent
        //Animation
        todo.classList.add("drop");
        removeLocalTodos(todo);
        //number of tasks
        nbrTasks--;
        getNbrTasks();
        todo.addEventListener('transitionend', function(){
            todo.remove(); 
        });
    }
    //Checked
    if(item.classList[0]=== 'complete-btn') {
        const todo =item.parentElement; //Select l'élément parent
        todo.classList.toggle('completed'); 
    }
}

function getName() {
    let name;

    name = prompt("Nom:");
    if (name === null) {
        name = "";
    } else {
        messageHello.innerHTML = '<h4>Hey ' + name + '!</h4>';
    }
}

function getNbrTasks() {
    if (nbrTasks === 0) {
        messageNbrTasks.innerHTML = "<h1>Vous n'avez pas de tâches en cours</h1>";
    } else if( nbrTasks === 1){
        messageNbrTasks.innerHTML = '<h1>' + nbrTasks + ' tâche en cours</h1>';
    } else {
        messageNbrTasks.innerHTML = '<h1>' + nbrTasks + ' tâches en cours</h1>';
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement ('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement ('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //number of tasks
        nbrTasks++;
        //check button
        const completedButton = document.createElement ('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //trash button
        const trashButton = document.createElement ('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // mettre dans ul
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}