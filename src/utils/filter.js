import moment from 'moment';

export const FilterType = {
  ALL: `all`,
  TODAY: `today`,
  WEEK: `week`,
  EXPIRED: `expired`,
  FINISHED: `finished`,
  PENDING: `pending`,
};

export const isExpired = (deadline, date) => {
  return deadline.isBefore(date) && !isSameDay(date, deadline);
};

export const isSameDay = (dateA, dateB) => {
  return dateA.isSame(dateB, `day`);
};

export const getTodaysTasks = (tasks, date) => {
  return tasks.filter((task) => task.deadline && isSameDay(task.deadline, date));
};

export const getThisWeeksTasks = (tasks, date) => {
  const endOfWeek = moment(date).endOf(`week`);
  return tasks.filter((task) => task.deadline && task.deadline.isSameOrAfter(date, `day`) && task.deadline.isSameOrBefore(endOfWeek, `day`));
};

export const getFinishedTasks = (tasks) => {
  return tasks.filter((task) => task.isFinished);
};

export const getExpiredTasks = (tasks, date) => {
  return tasks.filter((task) => {
    const deadline = task.deadline;

    if (!deadline || task.isFinished) {
      return false;
    }

    return isExpired(deadline, date);
  });
};

export const getPendingTasks = (tasks, date) => {
  return tasks.filter((task) => {
    const deadline = task.deadline;
    
    if (task.isFinished) {
      return false;
    }
    
    return !deadline || !isExpired(deadline, date);
  });
}

export const getTasksByFilter = (tasks, filterType) => {
  const currentDate = moment();
  
  switch (filterType) {
    case FilterType.ALL:
      return tasks;
    case FilterType.TODAY:
      return getTodaysTasks(tasks, currentDate);
    case FilterType.WEEK:
      return getThisWeeksTasks(tasks, currentDate);
    case FilterType.EXPIRED:
      return getExpiredTasks(tasks, currentDate);
    case FilterType.FINISHED:
      return getFinishedTasks(tasks);
    case FilterType.PENDING:
      return getPendingTasks(tasks, currentDate);
  }

  return tasks;
};
