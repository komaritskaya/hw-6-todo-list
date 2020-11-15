import moment from 'moment';

export const FilterType = {
  ALL: `all`,
  EXPIRED: `expired`,
  FINISHED: `finished`,
  PENDING: `pending`,
};

export const isExpired = (deadline, date) => {
  return deadline < date && !isSameDay(date, deadline);
};

export const isSameDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

export const getFinishedTasks = (tasks) => {
  return tasks.filter((task) => task.isFinished);
};

export const getExpiredTasks = (tasks, date) => {
  return tasks.filter((task) => {
    const deadline = task.deadline;

    if (!deadline) {
      return false;
    }

    return isExpired(deadline, date);
  });
};

export const getPendingTasks = (tasks, date) => {
  return tasks.filter((task) => {
    const deadline = task.deadline;
    
    if (!deadline) {
      return true;
    }
    
    return !isExpired(deadline, date) && !task.isFinished;
  });
}

export const getTasksByFilter = (tasks, filterType) => {
  const currentDate = new Date();

  switch (filterType) {
    case FilterType.ALL:
      return tasks;
    case FilterType.EXPIRED:
      return getExpiredTasks(tasks, currentDate);
    case FilterType.FINISHED:
      return getFinishedTasks(tasks);
    case FilterType.PENDING:
      return getPendingTasks(tasks, currentDate);
  }

  return tasks;
};
