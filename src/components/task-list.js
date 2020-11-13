import Abstract from './abstract';

const createTaskListTemplate = () => {
  return (
    `<div class="todo__current segment">
      <p class="todo__current-header ui medium header">Current Tasks</p>
      <ul class="todo__current-list ui relaxed divided list">
      </ul>
    </div>`
  );
};

export default class TaskList extends Abstract {
  getTemplate() {
    return createTaskListTemplate();
  }
}