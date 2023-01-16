import { ICard } from '../utils/interfaces/ICard';

export async function getCardsIds() {
  const cardsIds = localStorage.getItem('cardsIds');

  if (cardsIds) return JSON.parse(cardsIds);
}

export async function getCard(id: string) {
  const card = localStorage.getItem(`card#${id}`);

  if (card) {
    return JSON.parse(card);
  }
}

export async function addCard(card: ICard, idBoard: string) {
  const ids = localStorage.getItem('cardsIds');

  if (ids) {
    const array = [...JSON.parse(ids)];
    array.push({ id: card.id, idBoard });

    localStorage.setItem('cardsIds', JSON.stringify(array));
  } else {
    const cardsIds = [];
    cardsIds.push({ id: card.id, idBoard });

    localStorage.setItem('cardsIds', JSON.stringify(cardsIds));
  }

  return localStorage.setItem(`card#${card.id}`, JSON.stringify(card));
}

export async function addDescription(idCard: string, description: string) {
  const card = localStorage.getItem(`card#${idCard}`);

  if (card) {
    const obj = JSON.parse(card);

    obj.description = description;

    return localStorage.setItem(`card#${idCard}`, JSON.stringify(obj));
  }
}
