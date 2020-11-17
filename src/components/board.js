import Abstract from './abstract';

const createBoardTemplate = () => {
  return (
    `<div class="board">
      <p class="board__header ui medium header">Current Tasks</p>
      <ul class="board__list ui cards">
      </ul>
    </div>`
  );
};

export default class Board extends Abstract {
  getTemplate() {
    return createBoardTemplate();
  }
}