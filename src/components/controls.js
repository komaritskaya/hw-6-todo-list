import Abstract from './abstract';

const createControlsTemplate = () => {
  return (
    `<div class="todo__controls segment">
    </div>`
  );
};

export default class Controls extends Abstract {
  getTemplate() {
    return createControlsTemplate();
  }
}