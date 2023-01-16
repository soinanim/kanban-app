export async function getBoardsIds() {
  const boardsIds = localStorage.getItem('boardsIds');
  if (boardsIds) return JSON.parse(boardsIds);
}
