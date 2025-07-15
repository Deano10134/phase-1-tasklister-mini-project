document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  taskList.style.listStyleType = 'none';
  const sortBtn = document.getElementById('sort-tasks');
  sortBtn.style.margin = '10px';

  document.body.style.background = 'linear-gradient(#ffffff, rgba(51, 48, 68, 1))';

  let ascending = true;

  // Sort button logic
  sortBtn.addEventListener('click', () => {
    const tasks = Array.from(taskList.children);

    tasks.sort((a, b) => {
      const priorityA = parseInt(a.dataset.priority);
      const priorityB = parseInt(b.dataset.priority);
      return ascending ? priorityA - priorityB : priorityB - priorityA;
    });

    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));

    ascending = !ascending;
    sortBtn.textContent = ascending ? 'Sort Tasks ↑' : 'Sort Tasks ↓';
    sortBtn.style.margin = '10px';
  });

  // Form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskText = document.getElementById('new-task-description').value.trim();
    const user = document.getElementById('user').value.trim();
    const duration = document.getElementById('duration').value.trim();
    const dueDate = document.getElementById('due-date').value;
    const priorityValue = document.getElementById('priority').value;

    if (taskText && user) {
      const li = document.createElement('li');
      let priorityNumber;

      // Assign color and numeric priority
      switch (priorityValue) {
        case 'High':
          priorityNumber = 1;
          li.style.color = 'red';
          break;
        case 'Medium':
          priorityNumber = 2;
          li.style.color = 'orange';
          break;
        case 'Low':
          priorityNumber = 3;
          li.style.color = 'green';
          break;
      }

      li.dataset.priority = priorityNumber;

      // Task content
      li.innerHTML = `
        <strong>${taskText}</strong> — assigned to <em>${user}</em> |
        Duration: ${duration || 'n/a'} |
        Due: ${dueDate || 'unspecified'}
      `;

      // Checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', () => {
        li.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        li.style.opacity = checkbox.checked ? '0.5' : '1';
      });

      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';
      deleteBtn.style.marginLeft = '10px';
      deleteBtn.addEventListener('click', () => li.remove());

      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.className = 'edit-btn';
      editBtn.style.marginLeft = '5px';
      editBtn.addEventListener('click', () => {
        document.getElementById('new-task-description').value = taskText;
        document.getElementById('user').value = user;
        document.getElementById('duration').value = duration;
        document.getElementById('due-date').value = dueDate;
        document.getElementById('priority').value = priorityValue;
        li.remove(); // remove so it can be re-added on resubmit
      });

      // Add elements to the list item
      li.prepend(checkbox);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
      form.reset();
    }
  });
});
