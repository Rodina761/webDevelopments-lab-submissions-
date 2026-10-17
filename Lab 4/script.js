const form = document.getElementById('task-form');
const nameInput = document.getElementById('task-name');
const descriptionInput = document.getElementById('task-description');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');
const taskCount = document.getElementById('task-count');
const addButton = document.getElementById('show-form');
const cancelButton = document.getElementById('cancel-task');
const clearButton = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('[data-filter]');
const taskTemplate = document.getElementById('task-template');


const tasks = [
  { name: 'Study', description: 'Read chapter one.', completed: false },
  { name: 'Do homework', description: 'Finish the lab task.', completed: false },
  { name: 'Buy a notebook', description: 'Get a notebook for class.', completed: true }
];
let filter = 'all';

function closeForm() {
  form.hidden = true;
  form.reset();
  addButton.setAttribute('aria-expanded', 'false');
  addButton.focus();
}

addButton.addEventListener('click', function () {
  form.hidden = !form.hidden;
  addButton.setAttribute('aria-expanded', String(!form.hidden));
  if (!form.hidden) {
    nameInput.focus();
  }
});

cancelButton.addEventListener('click', closeForm);

form.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeForm();
  }
});

function showTasks() {
  taskList.replaceChildren();
  let completed = 0;
  let shownTasks = 0;

  tasks.forEach(function (task, index) {
    if (task.completed) {
      completed++;
    }

    if (filter === 'active' && task.completed) {
      return;
    }
    if (filter === 'completed' && !task.completed) {
      return;
    }

    shownTasks++;
    const row = taskTemplate.content.firstElementChild.cloneNode(true);
    const checkbox = row.querySelector('input');
    const nameLabel = row.querySelector('label');
    const descriptionText = row.querySelector('p');
    const deleteButton = row.querySelector('button');

    checkbox.id = 'task-' + index;
    checkbox.checked = task.completed;
    row.classList.toggle('completed', task.completed);
    nameLabel.htmlFor = checkbox.id;
    nameLabel.textContent = task.name;
    descriptionText.textContent = task.description;
    deleteButton.setAttribute('aria-label', 'Delete ' + task.name);

    checkbox.addEventListener('change', function () {
      task.completed = checkbox.checked;
      showTasks();
      const checkboxAfterUpdate = document.getElementById('task-' + index);
      if (checkboxAfterUpdate) {
        checkboxAfterUpdate.focus();
      } else {
        addButton.focus();
      }
    });

    deleteButton.addEventListener('click', function () {
      tasks.splice(index, 1);
      showTasks();
      addButton.focus();
    });

    taskList.appendChild(row);
  });

  const remaining = tasks.length - completed;
  if (remaining === 1) {
    taskCount.textContent = '1 task left';
  } else {
    taskCount.textContent = remaining + ' tasks left';
  }
  clearButton.disabled = completed === 0;
  emptyMessage.hidden = shownTasks > 0;
  if (tasks.length === 0) {
    emptyMessage.textContent = 'No tasks yet. Click Add to get started.';
  } else {
    emptyMessage.textContent = 'No tasks in this filter.';
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();

  if (name === '' || description === '') {
    return;
  }

  tasks.push({ name: name, description: description, completed: false });
  changeFilter('all');
  closeForm();
});

function changeFilter(choice) {
  filter = choice;
  filterButtons.forEach(function (button) {
    const selected = button.dataset.filter === choice;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  showTasks();
}

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    changeFilter(button.dataset.filter);
  });
});

clearButton.addEventListener('click', function () {
  for (let index = tasks.length - 1; index >= 0; index--) {
    if (tasks[index].completed) {
      tasks.splice(index, 1);
    }
  }
  showTasks();
});

showTasks();
