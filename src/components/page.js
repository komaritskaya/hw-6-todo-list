import Abstract from './abstract';

const createPageTemplate = () => {
  return `<div class="todo__page ui raised very padded text container segment"></div>`;
};

export default class Page extends Abstract {
  getTemplate() {
    return createPageTemplate();
  }
}