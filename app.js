// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// Event listeners
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