const todoContainer = document.querySelector(".todo-input-container");
const inputText = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoListUl = document.getElementById("todoList");
let remaining = document.getElementById('remaining-count')
let todoText; // for getting input value.
let todos = []; //we use todos to get item because it will became empty after the pages refreshs
// populating all the todos on the todolist ul

let todosString = localStorage.getItem("todos");
if (todosString) {
  todos = JSON.parse(todosString);
}
//storing in localstorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

const populatetodos = () => {
  let string = "";
  for (const todo of todos) {
    string += `<li id="todo-${todo.id}" class="todoitem ${todo.isCompleted ? "completed" : ""}">
                <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                <span class="todo-text">${todo.title}</span>
                <button class="delete-btn">delete</button>
            </li>`;
  }
  todoListUl.innerHTML = string;
  // adding delete todos functionality
  const deleteBtn = document.querySelectorAll(".delete-btn");
  deleteBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      const confirmation = confirm("Do you want to delete the task!");
      // confirm deletion of a task!!
      if (confirmation) {
        todos = todos.filter((todo) => {
          return "todo-" + todo.id !== e.target.parentNode.id;
        });
        saveTodos();
        populatetodos();
      }
    });
  });
  //adding checkbox funtionality
  let todoCheckBoxes = document.querySelectorAll(".todo-checkbox");
  todoCheckBoxes.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (e.target.checked) {
        element.parentNode.classList.add("completed");
        // updated todos so that it persist
        todos = todos.map((todo) => {
          // console.log("todo-" + todo.id, element.parentNode.id)
          if ("todo-" + todo.id == element.parentNode.id) {
            return { ...todo, isCompleted: true };
          } else {
            return todo;
          }
        });
        remaining.innerHTML = todos.filter((item) => {
          return item.isCompleted != true
        }).length
        saveTodos();
      } else {
        element.parentNode.classList.remove("completed");
        // updated todos so that it persist
        todos = todos.map((todo) => {
          // console.log("todo-" + todo.id, element.parentNode.id)
          if ("todo-" + todo.id == element.parentNode.id) {
            return { ...todo, isCompleted: false };
          } else {
            return todo;
          }
        });
 remaining.innerHTML = todos.filter((item) => {
          return item.isCompleted != true
        }).length
        saveTodos();
      }
    });
  });

};
//storing input value to local storage when button is clicked.
addTodoBtn.addEventListener("click", () => {
  todoText = inputText.value;
  if (todoText.trim().length < 4) {
    alert('Please enter a valid task!');
    return;
  }
  inputText.value = ""; // clearing previos value
  let todo = {
    id: Date.now(),
    title: todoText,
    isCompleted: false,
  };

  todos.push(todo);
  saveTodos();
  populatetodos();
});
populatetodos(); // adding todoes list to the screen

// clearing the task complete task list
const clearCompleteBtn = document.getElementById("clearCompleteBtn");
clearCompleteBtn.addEventListener("click", (e) => {
  console.log("You clicked me!");
  todos = todos.filter((todo) => {
    return !todo.isCompleted;
  });

  saveTodos();
  populatetodos();
});

//adding filter of add, active and completed

const filterBtn = document.querySelectorAll(".filter-btn");
filterBtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    console.log(e);
  });
});
