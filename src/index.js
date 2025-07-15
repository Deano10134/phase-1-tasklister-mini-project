document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  const deleteAllBtn = document.getElementById('delete-btn');
  const sortBtn = document.getElementById('sort-tasks');
document.body.style.background = 'linear-gradient(#ffffff, rgba(51, 48, 68, 1))';
  let ascending = true;
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const taskText = document.getElementById('new-task-description').value.trim();
  const user = document.getElementById('user').value.trim();
  const duration = document.getElementById('duration').value.trim();
  const dueDate = document.getElementById('due-date').value;
  const priorityValue = document.getElementById('priority').value;

  if (taskText && user) {
    const li = document.createElement('li');
    li.dataset.priority = priorityValue;

    // Color by priority
    switch (priorityValue) {
      case '1': li.style.color = 'red'; break;
      case '2': li.style.color = 'orange'; break;
      case '3': li.style.color = 'green'; break;
    }

    // Text layout
    li.innerHTML = `
      <strong>${taskText}</strong> — assigned to <em>${user}</em> |
      Duration: ${duration || 'n/a'} |
      Due: ${dueDate || 'unspecified'}
    `;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.style.marginLeft = '10px';

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.style.marginLeft = '5px';

    // Edit behavior
    editBtn.addEventListener('click', () => {
      document.getElementById('new-task-description').value = taskText;
      document.getElementById('user').value = user;
      document.getElementById('duration').value = duration;
      document.getElementById('due-date').value = dueDate;
      document.getElementById('priority').value = priorityValue;
      li.remove(); // Remove current task to replace it on resubmit
    });

    deleteBtn.addEventListener('click', () => li.remove());

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    form.reset(); // Clear form fields
  }
});
})

