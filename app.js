// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');


// Event listeners
todoButton.addEventListener('click', addTodo);

// Functions
function addTodo(event) {
    // Eviter de submit
    event.preventDefault();

    const todoDiv = document.createElement ('div');
    todoDiv.classList.add('todo');
    
    const newTodo = document.createElement ('li');
    newTodo.innerText = "hey";
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




}
