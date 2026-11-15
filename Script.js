document.addEventListener("DOMContentLoaded", function () {

    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");

    const taskList = document.getElementById("taskList");
    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");
    const pendingTasks = document.getElementById("pendingTasks");

    let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

    function saveTasks() {
        localStorage.setItem("academicTasks", JSON.stringify(tasks));
    }

    function updateSummary() {
        totalTasks.textContent = tasks.length;

        const completed = tasks.filter(task => task.completed).length;

        completedTasks.textContent = completed;
        pendingTasks.textContent = tasks.length - completed;
    }

    function displayTasks() {
        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.textContent = "No tasks yet. Add your first task!";
        }

        tasks.forEach(function (task) {

            const item = document.createElement("div");
            item.className = "task-item";

            const details = document.createElement("div");

            const title = document.createElement("h3");
            title.textContent = task.name;

            if (task.completed) {
                title.style.textDecoration = "line-through";
            }

            details.appendChild(title);

            if (task.date) {
                const date = document.createElement("p");
                date.textContent = "Due: " + task.date;
                details.appendChild(date);
            }

            const actions = document.createElement("div");
            actions.className = "task-actions";

            const completeButton = document.createElement("button");
            completeButton.textContent = task.completed ? "Undo" : "Complete";

            completeButton.addEventListener("click", function () {
                task.completed = !task.completed;
                saveTasks();
                displayTasks();
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function () {
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
                displayTasks();
            });
