import { IComment } from '../utils/interfaces/IComment';

export async function getCommentsIds() {
  const ids = localStorage.getItem('commentsIds');

  if (ids) return JSON.parse(ids);
}
export async function getComments(id: string) {
  const comment = localStorage.getItem(`comment#${id}`);

  if (comment) return JSON.parse(comment);
}

export async function addComment(idCard: string, comment: IComment) {
  const ids = localStorage.getItem('commentsIds');

  if (ids) {
    const array = [...JSON.parse(ids)];
    array.push({ id: comment.id, idCard });

    localStorage.setItem('commentsIds', JSON.stringify(array));
  } else {
    const commentsIds = [];
    commentsIds.push({ id: comment.id, idCard });

    localStorage.setItem('commentsIds', JSON.stringify(commentsIds));
  }

  return localStorage.setItem(`comment#${comment.id}`, JSON.stringify(comment));
}
