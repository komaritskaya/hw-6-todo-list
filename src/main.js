import BoardController from './controllers/board';
import TasksModel from "./models/tasks.js";

const pageElement = document.querySelector(`.page`);
const tasksModel = new TasksModel();

const boardController = new BoardController(pageElement, tasksModel);
boardController.init();
