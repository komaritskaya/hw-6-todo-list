import Abstract from './abstract';

const createTaskTemplate = (task) => {
  const iconType = task.isFinished ? `check` : `exclamation`;
  const buttonText = task.isFinished ? `Mark as undone` : `Mark as done`;
  const deadlineMarkup = task.deadline ? `<p class="description">Till ${task.deadline.format(`MMM DD, YYYY`)}</p>` : ``;
  return (
    `<div class="item">
      <div class="left floated content">
        <i class="small ${iconType} middle aligned icon"></i>
        <div class="right floated content">
          <p class="header">${task.description}</p>
          ${deadlineMarkup}
        </div>
      </div>
      <div class="right floated content">
        <button class="task__done ui button">${buttonText}</button>
        <button class="task__delete ui button">Delete</button>
      </div>
    </div>`
  );
};

export default class Task extends Abstract {
  constructor(task) {
    super();
    this._task = task;
  }
  
  getTemplate() {
    return createTaskTemplate(this._task);
  }
  
  setDoneButtonClickHandler(handler) {
    this.getElement().querySelector(`.task__done`)
      .addEventListener(`click`, handler);
  }
  
  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.task__delete`)
      .addEventListener(`click`, handler);
  }
}