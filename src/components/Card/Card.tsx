import React, { FC, useState, useCallback, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';
import { v4 as uuid } from 'uuid';

import Icons from '../Icons';
import Comment from '../Comment';
import { addDescription } from '../../api/card';
import { getCommentsIds, addComment } from '../../api/comment';
import { getCard } from '../../api/card';
import { ICard } from '../../utils/interfaces/ICard';

import './styles.css';

interface CardProps {
  id: string;
  boardTitle: string;
  user: string;
}

interface CommentIds {
  id: string;
  idCard: string;
}

const { TextArea } = Input;

const Card: FC<CardProps> = (props) => {
  const [card, setCard] = useState<ICard>({} as ICard);
  const [description, setDescription] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');
  const [commentIds, setCommentIds] = useState<CommentIds[]>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditDescription, setIsEditDescription] = useState<boolean>(true);

  const showModal = () => {
    setIsEditDescription(!card.description);

    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.currentTarget.value);
  };

  const onSaveDescription = () => {
    addDescription(card.id, description);

    setIsEditDescription(false);

    updateCard();
  };

  const onSaveComment = () => {
    const comment = {
      id: uuid(),
      content: commentContent,
      idCard: card.id,
      author: props.user,
    };

    addComment(card.id, comment);

    updateComments();
  };

  const updateCard = useCallback(() => {
    getCard(props.id)
      .then(setCard)
      .then(() => setIsEditDescription(!card.description));
  }, [props.id, card.description]);

  const updateComments = () => {
    getCommentsIds().then(setCommentIds);
  };

  useEffect(() => {
    updateCard();
    updateComments();
  }, [props.id, updateCard]);

  return (
    <>
      <div onClick={showModal} className='card'>
        {card?.title}
      </div>

      <Modal
        title={
          <div className='modal__title'>
            <Icons
              name='card-outline'
              color='#42526e'
              size='20'
              className='modal__icon'
            />
            <p>{card.title}</p>
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className='modal'>
        <div className='modal__header'>
          <span className='header__board-title'>
            in board <span>{props.boardTitle}</span>
          </span>
          <span className='header__author'>
            author <span>{card.author}</span>
          </span>
        </div>

        <div className='modal__description'>
          <h3 className='modal__h3'>
            <Icons
              name='align-left'
              color='#42526e'
              size='20'
              className='modal__icon'
            />
            Description
            {!isEditDescription && (
              <Button onClick={() => setIsEditDescription(true)}>Edit</Button>
            )}
          </h3>
          {!isEditDescription ? (
            <span className='modal__span'>{card.description}</span>
          ) : (
            <>
              <TextArea
                onChange={onChangeDescription}
                rows={2}
                placeholder='Add description'
                className='modal__description-textarea'
              />
              <Button
                onClick={onSaveDescription}
                type='primary'
                className='modal__button'>
                Save
              </Button>
              <Button
                onClick={() => setIsEditDescription(false)}
                className='modal__button-second'>
                Cancel
              </Button>
            </>
          )}
        </div>

        <div className='modal__comments'>
          <h3 className='modal__h3'>
            <Icons
              name='list-outline'
              color='#42526e'
              size='20'
              className='modal__icon'
            />
            Actions
          </h3>

          <div className='modal__comment-textarea'>
            <Icons
              name='user'
              color='#42526e'
              size='20'
              className='modal__icon'
            />
            <TextArea
              onChange={onChangeComment}
              rows={1}
              placeholder='Add comment'
            />
          </div>

          <Button
            onClick={onSaveComment}
            type='primary'
            className='modal__button'>
            Save
          </Button>

          {commentIds?.map(
            (comment) =>
              comment.idCard === card.id && (
                <div className='comments'>
                  <Comment id={comment.id} />
                </div>
              )
          )}
        </div>
      </Modal>
    </>
  );
};

export default Card;
