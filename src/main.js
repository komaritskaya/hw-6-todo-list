import PageController from './controllers/page';
import TasksModel from "./models/tasks.js";

const bodyElement = document.querySelector(`body`);
const tasksModel = new TasksModel();

const pageController = new PageController(bodyElement, tasksModel);
pageController.init();
