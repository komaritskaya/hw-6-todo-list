import moment from 'moment';
import {nanoid} from 'nanoid';
import he from 'he';
import Abstract from './abstract';

const createFormTemplate = () => {
  const minDate = moment().format(`YYYY-MM-DD`);
  return (
    `<form class="todo__form ui form">
      <p>Add new Task</p>
      <div class="fields">
        <div class="field">
          <label>Description</label>
          <input name="description" type="text" placeholder="Ex. do the dishes" required>
        </div>
        <div class="field">
          <label>Deadline</label>
          <input name="deadline" type="date" min=${minDate} />
        </div>
        <div class="field">
          <input type="submit" value="Submit">
        </div>
      </div>
    </form>`
  );
};

const parseFormData = (formData) => {
  return {
    id: nanoid(),
    description: he.encode(formData.get(`description`)),
    deadline: moment(formData.get(`deadline`)),
    isFinished: false,
  };
};

export default class Form extends Abstract {
  getTemplate() {
    return createFormTemplate();
  }
  
  getData() {
    const form = this.getElement();
    const formData = new FormData(form);
    return parseFormData(formData);
  }
  
  setFormSubmitHandler(handler) {
    this.getElement()
      .addEventListener(`submit`, handler);
  }
}