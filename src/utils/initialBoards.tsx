import { v4 as uuid } from 'uuid';

export const initialBoards = [
  {
    id: uuid(),
    title: 'TODO',
  },
  { id: uuid(), title: 'In Progress' },
  { id: uuid(), title: 'Testing' },
  { id: uuid(), title: 'Done' },
];
