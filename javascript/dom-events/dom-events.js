const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const countEl = document.getElementById("task-count");
const clearBtn = document.getElementById("clear-completed");
const emptyState = document.getElementById("empty-state");

function createTaskElement(text) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${text}</span>
        <button type="button" class="delete-btn">Delete</button>
    `;
    li.querySelector(".task-text").addEventListener("click", () => {
        li.classList.toggle("completed");
        updateCount();
    });
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        updateCount();
        toggleEmptyState();
    });
    return li;
}

function addTask() {
    const text = input.value.trim();
    if (!text) {
      return;
    }
    list.appendChild(createTaskElement(text));
    input.value = "";
    updateCount();
    toggleEmptyState();
}

function updateCount() {
    const remaining = list.querySelectorAll("li:not(.completed)").length;
    countEl.textContent = `${remaining} tasks left`;
}

function toggleEmptyState() {
    emptyState.hidden = list.children.length > 0;
}

function clearCompleted() {
    list.querySelectorAll("li.completed").forEach((li) => li.remove());
    updateCount();
    toggleEmptyState();
}

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask();
    });
    clearBtn.addEventListener("click", clearCompleted);
    toggleEmptyState();
});
