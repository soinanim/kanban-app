import React, { FC, useState, useEffect } from 'react';
import { getComments } from '../../api/comment';
import { IComment } from '../../utils/interfaces/IComment';
import Icons from '../Icons';

import './style.css';

interface CommentProps {
  id: string;
}

const Comment: FC<CommentProps> = (props) => {
  const [comment, setComment] = useState<IComment>();

  useEffect(() => {
    getComments(props.id).then(setComment);
  }, [props.id]);

  return (
    <div className='comment'>
      <span className='comment__author'>
        <Icons name='user' color='#42526e' size='20' className='modal__icon' />
        {comment?.author}
      </span>
      <p className='comment__content'>{comment?.content}</p>
    </div>
  );
};

export default Comment;
