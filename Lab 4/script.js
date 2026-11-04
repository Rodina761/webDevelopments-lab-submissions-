"use strict";
class Todo {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.done = false;
    }
}
let todos = [new Todo(1, "See Lecture"), new Todo(2, "Solve assignment")];
let nextId = 3;
let filter = "all";
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const count = document.getElementById("count");
const clearCompletedBtn = document.getElementById("clear-completed");
const clearAllBtn = document.getElementById("clear-all");
const filterBtns = document.querySelectorAll(".filters button");
function render() {
    list.innerHTML = "";
    const shown = todos.filter((t) => {
        if (filter === "active")
            return !t.done;
        if (filter === "completed")
            return t.done;
        return true;
    });
    shown.forEach((todo) => {
        const li = document.createElement("li");
        li.dataset.id = String(todo.id);
        if (todo.done)
            li.classList.add("done");
        const check = document.createElement("input");
        check.type = "checkbox";
        check.checked = todo.done;
        const span = document.createElement("span");
        span.textContent = todo.text;
        const del = document.createElement("button");
        del.className = "delete";
        del.textContent = "🗑";
        li.append(check, span, del);
        list.appendChild(li);
    });
    const left = todos.filter((t) => !t.done).length;
    count.textContent = `${left} ${left === 1 ? "item" : "items"} left`;
}
function addTodo() {
    const text = input.value.trim();
    if (text === "")
        return;
    todos = [...todos, new Todo(nextId, text)];
    nextId++;
    input.value = "";
    render();
}
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        addTodo();
});
list.addEventListener("click", (e) => {
    const target = e.target;
    const li = target.closest("li");
    if (!li)
        return;
    const id = Number(li.dataset.id);
    if (target.classList.contains("delete")) {
        todos = todos.filter((t) => t.id !== id);
        render();
    }
    else if (target instanceof HTMLInputElement && target.type === "checkbox") {
        const todo = todos.find((t) => t.id === id);
        if (todo)
            todo.done = !todo.done;
        render();
    }
});
list.addEventListener("dblclick", (e) => {
    const target = e.target;
    if (target.tagName !== "SPAN")
        return;
    const li = target.closest("li");
    const todo = todos.find((t) => t.id === Number(li.dataset.id));
    if (!todo)
        return;
    const edit = document.createElement("input");
    edit.type = "text";
    edit.className = "edit";
    edit.value = todo.text;
    target.replaceWith(edit);
    edit.focus();
    edit.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
            const newText = edit.value.trim();
            if (newText !== "")
                todo.text = newText;
            render();
        }
    });
    edit.addEventListener("blur", render);
});
filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filter = btn.dataset.filter;
        render();
    });
});
clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter((t) => !t.done);
    render();
});
clearAllBtn.addEventListener("click", () => {
    todos = [];
    render();
});
render();
