// Get references to the HTML elements
let taskInput = document.getElementById("new-task"); // Input field for the new task
let addButton = document.getElementsByTagName("button")[0]; // Add button
let incompleteTaskHolder = document.getElementById("incomplete-tasks"); // List for incomplete tasks
let completedTasksHolder = document.getElementById("completed-tasks"); // List for completed tasks

// Function to create a new task element
let createNewTaskElement = function(taskString) {
    let listItem = document.createElement("li"); // Create a new list item

    // Create the necessary elements for each task
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");

    // Set the properties of the elements
    label.innerText = taskString; // Set the task name
    checkBox.type = "checkbox"; // Set the checkbox type
    deleteButton.innerText = "Delete"; // Set delete button text
    deleteButton.className = "delete"; // Set class for styling
    editButton.innerText = "Edit"; // Set edit button text
    editButton.className = "edit"; // Set class for styling

    // Append the elements to the list item
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem; // Return the new list item
};

// Function to add a new task
let addTask = function() {
    
    // Create a new task item from the input value
    let listItem = createNewTaskElement(taskInput.value);

    // If the input is empty, don't add a new task
    if (taskInput.value === "") {
        debugger
        return;
    }

    // Append the task to the incomplete tasks list
    incompleteTaskHolder.appendChild(listItem);
    
    // Bind the task's events (checkbox, delete, etc.)
    bindTaskEvents(listItem, taskCompleted);

    // Clear the input field
    taskInput.value = "";
};

// Function to delete a task
let deleteTask = function() {
    let listItem = this.parentNode; // Get the list item that the delete button belongs to
    let ul = listItem.parentNode; // Get the parent list (either incomplete or completed)

    // Remove the task from the list
    ul.removeChild(listItem);
};

// Function to mark a task as completed
let taskCompleted = function() {
    let listItem = this.parentNode; // Get the task item
    completedTasksHolder.appendChild(listItem); // Move task to completed list
    bindTaskEvents(listItem, taskIncomplete); // Rebind events for the new state
};

// Function to mark a task as incomplete
let taskIncomplete = function() {
    let listItem = this.parentNode; // Get the task item
    incompleteTaskHolder.appendChild(listItem); // Move task to incomplete list
    bindTaskEvents(listItem, taskCompleted); // Rebind events for the new state
};

// Function to edit a task
let editTask = function() {
    let listItem = this.parentNode; // Get the task item
    let label = listItem.querySelector("label"); // Get the label (task name)

    // Prompt the user to edit the task name
    let newTaskDescription = prompt("Edit your task:", label.innerText);

    // If the user enters a new description, update the label
    if (newTaskDescription) {
        label.innerText = newTaskDescription;
    }
};

// Function to bind events (checkbox, delete, edit) to a task
let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    let checkBox = taskListItem.querySelector("input[type=checkbox]"); // Get the checkbox
    let deleteButton = taskListItem.querySelector("button.delete"); // Get the delete button
    let editButton = taskListItem.querySelector("button.edit"); // Get the edit button

    // Bind the delete button to the deleteTask function
    deleteButton.onclick = deleteTask;
    // Bind the checkbox to either taskCompleted or taskIncomplete
    checkBox.onchange = checkBoxEventHandler;
    // Bind the edit button to the editTask function
    editButton.onclick = editTask;
};

// Add click event listener to the add button to trigger adding a task
addButton.addEventListener("click", addTask);

// Bind events to existing tasks in the incomplete tasks list
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Bind events to existing tasks in the completed tasks list
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
