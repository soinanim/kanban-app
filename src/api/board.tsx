export async function getBoard(id: string) {
  const board = localStorage.getItem(`board#${id}`);

  if (board) {
    return JSON.parse(board);
  }
}

export async function getBoardTitle(id: string) {
  const board = localStorage.getItem(`board#${id}`);

  if (board) {
    return JSON.parse(board).title;
  }
}

export async function updateBoardTitle(id: string, newTitle: string) {
  const board = localStorage.getItem(`board#${id}`);

  if (board) {
    const obj = JSON.parse(board);

    obj.title = newTitle;

    return localStorage.setItem(`board#${id}`, JSON.stringify(obj));
  }
}
