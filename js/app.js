const formAdd = document.querySelector("#form-add");
const listTasks = document.querySelector("#list-tasks");
const btnMode = document.querySelector('#btn-mode');
let tasks = [];

formAdd.addEventListener("submit", getTask);
btnMode.addEventListener('click', setMode);

window.onload = () => {
  allTasks();
};

function getTask(event) {
  event.preventDefault();

  const task = document.querySelector("#task").value;

  const newTask = {
    task,
    id: Date.now(),
    completed: false,
  };

  tasks.push(newTask);

  document.querySelector("#task").value = "";

  allTasks();
}

function showTasks(action = "All") {
  let showTasks = [];

  clearHtml();

  if (action == "Active") {
    showTasks = tasks.filter((task) => !task.completed);
  } else if (action == "Completed") {
    showTasks = tasks.filter((task) => task.completed);
  } else {
    showTasks = [...tasks];
  }

  showTasks.forEach(({ task, id, completed }) => {
    const divItem = document.createElement("div");
    divItem.setAttribute("class", "item-task");
    divItem.setAttribute("id", id);

    const divInfo = document.createElement("div");
    divInfo.setAttribute("class", "info-task");

    const cheack = document.createElement("div");
    cheack.setAttribute("class", "check-point");

    cheack.onclick = () => cheackTask(id);

    if (completed) {
      cheack.innerHTML = `<img src="./img/icon-check.svg" />`;
      divItem.setAttribute("class", "item-task completed completed-task");
    }

    const textTask = document.createElement("p");
    textTask.textContent = task;

    divInfo.appendChild(cheack);
    divInfo.appendChild(textTask);

    divItem.appendChild(divInfo);

    listTasks.appendChild(divItem);
  });

  setNumberItems();
}

function clearHtml() {
  while (listTasks.lastElementChild) {
    listTasks.removeChild(listTasks.lastElementChild);
  }
}

function cheackTask(id) {
  tasks.map((task) => {
    if (task.id == id && !task.completed) {
      task.completed = true;
    } else if (task.id == id && task.completed) {
      task.completed = false;
    }
  });

  allTasks();
}

function setNumberItems() {
  const numItems = tasks.length;
  document.querySelector("#numberItems").textContent = `${numItems} items left`;
}

function allTasks() {
  deleteActionBtn()
  showTasks();
  document.querySelector("#btn-all").classList.add("active");
}

function activeTasks() {
  deleteActionBtn()
  showTasks("Active");
  document.querySelector("#btn-active").classList.add("active");
}

function completedTasks() {
  deleteActionBtn()
  showTasks("Completed");
  document.querySelector("#btn-completed").classList.add("active");
}

function clearTasksCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  allTasks();
}

function deleteActionBtn() {
  document.querySelector("#btn-all").classList.remove("active");
  document.querySelector("#btn-active").classList.remove("active");
  document.querySelector("#btn-completed").classList.remove("active");
}

function setMode() {

  if(!document.body.classList.contains('light')) {
    document.querySelector('#btn-mode').src = './img/icon-moon.svg';
  } else {
    document.querySelector('#btn-mode').src = './img/icon-sun.svg';
  }

  document.querySelector('body').classList.toggle('light');
  document.querySelector('header.header').classList.toggle('light');
  document.querySelector('section.conten div.form-add').classList.toggle('light');
  document.querySelector('section.conten div.list-tasks').classList.toggle('light');
  document.querySelector('section.conten div.form-add form input[type="text"]').classList.toggle('light');
  document.querySelector('section.conten div.list-tasks').classList.toggle('light');
  document.querySelector('section.conten div div.action-tasks ul li.sub-items').classList.toggle('light');
  document.querySelector('div.list-tasks').classList.toggle('light');


}