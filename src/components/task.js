import moment from 'moment';
import Abstract from './abstract';
import {isExpired} from '../utils/filter';

const createTaskTemplate = (task) => {
  const {deadline, description, isFinished} = task;
  const currentDate = moment();
  const expired = deadline && isExpired(deadline, currentDate);
  const iconType = isFinished ? `check` : expired ? `poo` : `calendar alternate outline`;
  const buttonText = isFinished ? `Mark as undone` : `Mark as done`;
  const deadlineMarkup = deadline ? `<p class="description">Till ${deadline.format(`MMM DD, YYYY`)}</p>` : ``;
  return (
    `<div class="item ui segment">
      <div class="left floated content">
        <i class="small ${iconType} middle aligned icon"></i>
        <div class="right floated content">
          <p class="header">${description}</p>
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