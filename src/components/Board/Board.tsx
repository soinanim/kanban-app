import React, { FC, useState, useEffect } from 'react';
import { Typography, Input, Button } from 'antd';
import { v4 as uuid } from 'uuid';

import { IBoard } from '../../utils/interfaces/IBoard';
import { getBoard, updateBoardTitle } from '../../api/board';
import { getUser } from '../../api/user';
import { addCard, getCardsIds } from '../../api/card';

import Icons from '../Icons';

import './style.css';
import Card from '../Card';

const { Paragraph } = Typography;
const { TextArea } = Input;

interface BoardProps {
  id: string;
}

interface CardsIds {
  id: string;
  idBoard: string;
}

const Board: FC<BoardProps> = (props) => {
  const [user, setUser] = useState<string>('' as string);
  const [board, setBoard] = useState<IBoard>({} as IBoard);
  const [boardTitle, setBoardTitle] = useState<string>('');
  const [cardTitle, setCardTitle] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [cardsIds, setCardsIds] = useState<CardsIds[]>();

  const onChangeBoardTitle = (newBoardTitle: string) => {
    setBoardTitle(newBoardTitle);
    updateBoardTitle(props.id, newBoardTitle);
  };

  const onAddButtonClick = () => {
    const card = {
      id: uuid(),
      title: cardTitle,
      author: user,
      idBoard: props.id,
    };

    addCard(card, props.id).then(() => getCardsIds().then(setCardsIds));
    setIsAdding((state) => !state);
  };

  const onChangeCardTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardTitle(e.currentTarget.value);
  };

  useEffect(() => {
    getBoard(props.id).then(setBoard);
    getUser().then((res) => res && setUser(res));
    getCardsIds().then(setCardsIds);
  }, [props]);

  return (
    <div className='board'>
      <Paragraph
        editable={{
          tooltip: 'click to edit text',
          onChange: onChangeBoardTitle,
          enterIcon: null,
        }}>
        {boardTitle || board.title}
      </Paragraph>
      {cardsIds?.map(
        (cardId) =>
          cardId.idBoard === props.id && (
            <Card id={cardId.id} boardTitle={board.title} user={user} />
          )
      )}
      {!isAdding && (
        <button
          onClick={() => setIsAdding((state) => !state)}
          className='add-card-button'>
          <Icons name='plus' color='#6b778c' size='20' className='add-button' />
          Add card
        </button>
      )}
      {isAdding && (
        <>
          <TextArea
            onChange={onChangeCardTitle}
            rows={3}
            placeholder='enter a title for this card'
            className='new-card-textarea'
          />
          <div className='adding-card'>
            <Button onClick={onAddButtonClick} type='primary'>
              Add card
            </Button>
            <button
              onClick={() => setIsAdding((state) => !state)}
              className='close-button'>
              <Icons name='x' color='#6B778C' size='25' className='close' />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
