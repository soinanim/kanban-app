import { getBoardsIds } from '../../api/getBoardIds';

export async function loadBoards() {
  const boards = await getBoardsIds();

  return { boards };
}
