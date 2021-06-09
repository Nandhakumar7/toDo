"use strict";

var i = 0;
var taskId = "tasks";
var subTaskId;
var allTasks;
var listElement = new Array();
/*
This functions are excecute default,
when page loads.
*/

(function init() {
  var MyDay = {
    name: "My Day",
    id: "MyDay",
    icon: "far fa-sun leftlist-icon"
  };
  var important = {
    name: "Important",
    id: "important",
    icon: "far fa-star leftlist-icon"
  };
  var planned = {
    name: "Planned",
    id: "planned",
    icon: "leftlist-icon fas fa-calendar-alt"
  };
  var assignedToYou = {
    name: "Assigned to you",
    id: "assignedToYou",
    icon: "leftlist-icon far fa-id-badge"
  };
  var flaggedEmail = {
    name: "Flagged email",
    id: "flaggedEmail",
    icon: "leftlist-icon far fa-flag"
  };
  allTasks = {
    name: "Tasks",
    id: "tasks",
    icon: "lefthead-icon fas fa-home"
  };
  listElement = [MyDay, important, planned, assignedToYou, flaggedEmail, allTasks];
  listElement.forEach(function (item) {
    addListElement(item);
  });
  document.getElementById("head").innerHTML = allTasks.name;
  var taskList = new Array();
  allTasks.task = taskList;
  showTasks(taskList);
})();
/*
create new task category here.
*/


function addListElement(item) {
  var list = document.getElementById("my-list");
  var li = document.createElement("Li");
  li.setAttribute("id", item.id);

  if (5 == i) {
    li.setAttribute("class", "listStyle last-list");
  } else {
    li.setAttribute("class", "listStyle");
  }

  var icon = document.createElement("i");
  icon.setAttribute("class", item.icon);
  var smallDivision = document.createElement("span");
  smallDivision.setAttribute("class", "listvalue-style");
  var listValue = document.createTextNode(item.name);
  li.appendChild(icon);
  smallDivision.appendChild(listValue);
  li.appendChild(smallDivision);
  list.appendChild(li);
  i = i + 1;
}
/*
  when enter key press call specific method.
*/


function handleKeyPress(e) {
  if (e.keyCode == 13) {
    newElement();
  }
}
/*
when mouse click show placeholder in search box.
*/


function showPlaceholder() {
  input = document.getElementById('search');
  input.setAttribute('placeholder', 'Search');
}
/*
when mouse move from box then hide placeholder in search box.
*/


function unshowPlaceHolder() {
  input.setAttribute('placeholder', '');
}

;
/*
event listener for handle search box events.
*/

input = document.getElementById('search');
input.addEventListener("mouseout", unshowPlaceHolder);
var j = 0;
/*
get input value from user and send to create new task category.
*/

function newElement() {
  var inputValue = document.getElementById("newList").value;

  if (inputValue == "") {
    if (0 == j) {
      inputValue = "Untitled list";
    } else {
      inputValue = "Untitled list(" + j + ")";
    }

    j = j + 1;
  }

  var newValue = document.createTextNode(inputValue);
  newValue = {
    name: inputValue,
    id: "new" + i,
    icon: "fas fa-list lefthead-icon"
  };
  listElement[i] = newValue;
  addListElement(newValue);
  document.getElementById("newList").value = "";
}
/*
list evenetlistner used to handle list events 
used for create tasks to category.
*/


list = document.getElementById("my-list");
list.addEventListener("click", rightSidePrint);
/*
display the category name and tasks.
and display form to add task.
*/

function rightSidePrint(event) {
  var id = event.target.id;
  var rightContainer = document.getElementById("right-container");
  rightContainer.setAttribute("class", "right-container");
  var subTasks = document.getElementById("subtask-container");
  subTasks.setAttribute("class", "subtask-container");
  listElement.forEach(function (item) {
    if (id == item.id) {
      document.getElementById("head").innerHTML = item.name;
      var taskList1 = document.getElementById("task-list");
      taskList1.innerHTML = "";

      if (Object.keys(item).length == 3) {
        var tasks = new Array();
        item.task = tasks;
        drawLine(0);
      } else {
        showTasks(item.task);
      }

      taskId = id;
    }
  });
}
/*
display the all tasks of the category
*/


function showTasks(tasks) {
  var taskCount = 0;
  var taskList1 = document.getElementById("task-list");
  tasks.forEach(function (items) {
    var li = document.createElement("Li");
    var value = document.createTextNode(items.name);
    li.setAttribute("class", "task-liststyle");
    li.setAttribute("id", items.id);
    var icon = document.createElement("i");
    var span = document.createElement("span");

    if (0 == items.completed) {
      icon.setAttribute("class", "far fa-circle");
      span.setAttribute("class", "task-align");
    } else {
      icon.setAttribute("class", "far fa-check-circle");
      span.setAttribute("class", "task-align complete");
    }

    span.appendChild(value);
    icon.setAttribute("id", items.completedId);
    li.appendChild(icon);
    var div = document.createElement("div");
    div.setAttribute("class", "important");
    div.setAttribute("onclick", "showImportant");
    var important = document.createElement("i");

    if (0 == items.important) {
      important.setAttribute("class", "far fa-star");
    } else {
      important.setAttribute("class", "fas fa-star");
    }

    important.setAttribute("id", items.importantId);
    li.appendChild(span);
    div.appendChild(important);
    li.appendChild(div);
    taskList1.appendChild(li);
    taskCount = taskCount + 1;
  });
  drawLine(taskCount);
}

var taskValue = 1;
var idValue = 1;
/*
new task object created and added to category task list.
*/

function addTask() {
  var taskObject;
  inputValue = document.getElementById("newTask").value;

  if (inputValue != "") {
    idValue = 1 + idValue;
    taskObject = createTask(inputValue);
    var tasks;
    var taskCount = 0;
    listElement.forEach(function (item) {
      if (taskId == item.id) {
        tasks = item.task;
        tasks.unshift(taskObject);
      }
    });

    if (taskId != "tasks") {
      allTasks.task.unshift(taskObject);
    }

    var taskList1 = document.getElementById("task-list");
    taskList1.innerHTML = "";
    showTasks(tasks);
    document.getElementById("newTask").value = "";
    showButton();
  }
}
/*
create task object 
*/


function createTask(inputValue) {
  var inputValue = {
    name: inputValue,
    id: inputValue,
    completed: 0,
    important: 0,
    importantId: inputValue + idValue,
    completedId: "cmt" + inputValue + idValue,
    steps: new Array()
  };
  return inputValue;
}
/*
when enter key press call specific method.
*/


function handleKeyPressTask(e) {
  if (e.keyCode == 13) {
    addTask();
  }
}
/*
when enter key press call specific method.
*/


function handleKeyPressSubTask(e) {
  if (e.keyCode == 13) {
    addSubTask();
  }
}
/*
add lines to balance places.
*/


function drawLine(count) {
  var lineCount = 8 - count;
  var taskList1 = document.getElementById("task-list");

  for (var _i = 0; _i < lineCount; _i++) {
    var li = document.createElement("Li");
    var div = document.createElement("div");
    div.setAttribute("class", "line-liststyle");
    li.appendChild(div);
    taskList1.appendChild(li);
  }

  showButton();
}
/*
eventlistner to handle tasks adding events.
*/


addButton = document.getElementById("newTask");
addButton.addEventListener("input", showButton);
/*
show add buttom when click event occurs.
*/

function showButton() {
  if (document.getElementById("newTask").value == "") {
    var h3 = document.getElementById("add-style");
    h3.setAttribute("class", "add-style");
    var icon = document.getElementById("form-icon");
    icon.setAttribute("class", "fas fa-plus lefthead-icon");
  } else {
    var _h = document.getElementById("add-style");

    _h.setAttribute("class", "add-styleShow");

    var _icon = document.getElementById("form-icon");

    _icon.setAttribute("class", "far fa-circle");
  }
}
/*
eventlistner to handle tasks events.
*/


var subtaskEvents = document.getElementById("task-list");
subtaskEvents.addEventListener("click", showSubTasks, false);
/*
handel the event and redirect the method 
based on click event.
*/

function showSubTasks(event) {
  if (event.target.className == "far fa-star") {
    setSubTaskId(event, 1);
    showImportant();
  } else if (event.target.className == "fas fa-star") {
    setSubTaskId(event, 1);
    showImportant();
  } else if (event.target.className == "far fa-circle") {
    setSubTaskId(event, 0);
    completeTask();
  } else if (event.target.className == "far fa-check-circle") {
    setSubTaskId(event, 0);
    completeTask();
  } else {
    subTaskId = event.target.id;
    showSubTask(subTaskId);
  }
}
/*
set subtask id value based on importantId and completeId.
*/


function setSubTaskId(event, value) {
  var idImportant = event.target.id;
  listElement.forEach(function (item) {
    if (taskId == item.id) {
      item.task.forEach(function (items) {
        if (1 == value) {
          if (idImportant == items.importantId) {
            subTaskId = items.id;
          }
        } else {
          if (idImportant == items.completedId) {
            subTaskId = items.id;
          }
        }
      });
    }
  });
}
/*
eventlistner to handle subtasks adding events.
*/


subTaskButton = document.getElementById("newsubTask");
subTaskButton.addEventListener("input", showSubTaskButton);
/*
add subtasks button show when textbox clicked.
*/

function showSubTaskButton() {
  if (document.getElementById("newsubTask").value == "") {
    var h3 = document.getElementById("addsubtask-style");
    h3.setAttribute("class", "add-style");
    var icon = document.getElementById("forms-icon");
    icon.setAttribute("class", "fas fa-plus lefthead-icon");
  } else {
    var _h2 = document.getElementById("addsubtask-style");

    _h2.setAttribute("class", "add-styleShow");

    var _icon2 = document.getElementById("forms-icon");

    _icon2.setAttribute("class", "far fa-circle");
  }
}
/*
add steps as a subtasks to tasks.
*/


function addSubTask() {
  inputValue = document.getElementById("newsubTask").value;
  listElement.forEach(function (item) {
    if (taskId == item.id) {
      item.task.forEach(function (items) {
        if (subTaskId == items.id) {
          var subTasksList = items.steps;
          subTasksList.push(inputValue);
          showAllSubTasks(subTasksList);
        }
      });
    }
  });
  document.getElementById("newsubTask").value = "";
  showSubTaskButton();
}
/*
show all steps of the tasks.
*/


function showAllSubTasks(subTasksList) {
  document.getElementById("subtask-list").innerHTML = "";
  subTasksList.forEach(function (items) {
    var li = document.createElement("Li");
    var value = document.createTextNode(items);
    li.setAttribute("class", "subtask-liststyle");
    li.setAttribute("id", items);
    var icon = document.createElement("i");
    icon.setAttribute("class", "far fa-circle");
    var span = document.createElement("span");
    span.setAttribute("class", "subtask-align");
    span.appendChild(value);
    li.appendChild(icon);
    li.appendChild(span);
    var hr = document.createElement("hr");
    hr.setAttribute("class", "list-lines");
    li.appendChild(hr);
    document.getElementById("subtask-list").appendChild(li);
  });
}
/*
eventlistner to handle important tasks.
*/


important = document.getElementById("rightImportant");
important.addEventListener("click", showImportant);
/*
eventlistner to handle complete tasks.
*/

important = document.getElementById("rightComplete");
important.addEventListener("click", completeTask);
/*
mark as a important to task and change the icons.
*/

function showImportant() {
  var importantTasks;
  listElement.forEach(function (item) {
    if (taskId == item.id) {
      importantTasks = item.task;
      item.task.forEach(function (items) {
        if (subTaskId == items.id) {
          if (0 == items.important) {
            items.important = 1;
          } else {
            items.important = 0;
          }
        }
      });
    }
  });
  document.getElementById("task-list").innerHTML = "";
  showTasks(importantTasks);
  showSubTask(subTaskId);
}
/*
show subtasks in when task clicked in center part.
*/


function showSubTask(subTaskId) {
  var rightContainer = document.getElementById("right-container");
  rightContainer.setAttribute("class", "rightcontainer-style right-container");
  var subTasks = document.getElementById("subtask-container");
  subTasks.setAttribute("class", "subtask-container-show");
  listElement.forEach(function (item) {
    if (taskId == item.id) {
      item.task.forEach(function (items) {
        if (subTaskId == items.id) {
          displaySubtasks(items);
        }
      });
    }
  });
}
/*
display subtasks in right side based on tasks.
*/


function displaySubtasks(items) {
  document.getElementById("subtask-head").innerHTML = items.name;

  if (1 == items.important) {
    document.getElementById("rightImportant").setAttribute("class", "fas fa-star important");
  } else {
    document.getElementById("rightImportant").setAttribute("class", "far fa-star important");
  }

  if (1 == items.completed) {
    document.getElementById("subtask-head").setAttribute("class", "subtask-head complete");
    document.getElementById("rightComplete").setAttribute("class", "far fa-check-circle lefthead-icon");
  } else {
    document.getElementById("subtask-head").setAttribute("class", "subtask-head");
    document.getElementById("rightComplete").setAttribute("class", "far fa-circle lefthead-icon");
  }

  showAllSubTasks(items.steps);
}
/*
mark as a complete to task and change the icons.
*/


function completeTask() {
  var completedTasks;
  listElement.forEach(function (item) {
    if (taskId == item.id) {
      completedTasks = item.task;
      item.task.forEach(function (items) {
        if (subTaskId == items.id) {
          if (0 == items.completed) {
            items.completed = 1;
          } else {
            items.completed = 0;
          }
        }
      });
    }
  });
  document.getElementById("task-list").innerHTML = "";
  showTasks(completedTasks);
  showSubTask(subTaskId);
}