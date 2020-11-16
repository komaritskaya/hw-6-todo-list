import moment from 'moment';
import {nanoid} from 'nanoid';
import he from 'he';
import Abstract from './abstract';

const createFormTemplate = () => {
  const minDate = moment().format(`YYYY-MM-DD`);
  return (
    `<form class="todo__form ui segment form">
      <p class="ui medium header">Add new Task</p>
      <div class="two fields">
        <div class="field">
          <label>Description</label>
          <input name="description" type="text" placeholder="Example: do the dishes" required>
        </div>
        <div class="field">
          <label>Deadline</label>
          <input name="deadline" type="date" min=${minDate} />
        </div>
      </div>
      <input type="submit" value="Submit" class="ui submit button">
    </form>`
  );
};

const parseFormData = (formData) => {
  const deadline = formData.get(`deadline`) ? moment(formData.get(`deadline`)) : null;
  // console.log()
  return {
    id: nanoid(),
    description: he.encode(formData.get(`description`)),
    deadline,
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
  
  reset() {
    const form = this.getElement();
    form.reset();
  } 
   
  setFormSubmitHandler(handler) {
    this.getElement()
      .addEventListener(`submit`, handler);
  }
}