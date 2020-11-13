import moment from 'moment';
import {nanoid} from 'nanoid';

export const tasks = [
  {
    id: nanoid(),
    description: `Clean my room`,
    deadline: null,
    isFinished: false,
  },
  {
    id: nanoid(),
    description: `Do the homework`,
    deadline: moment().startOf(`month`),
    isFinished: false,
  },
];