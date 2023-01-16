import React, { FC, useState, useEffect } from 'react';
import Board from '../../components/Board/Board';
import { getBoardsIds } from '../../api/getBoardIds';

import './styles.css';

const Boards: FC = () => {
  const [boardsIds, setBoardsIds] = useState<string[]>();

  useEffect(() => {
    getBoardsIds().then(setBoardsIds);
  }, []);

  return (
    <div className='boards'>
      {boardsIds?.map((idBoard) => (
        <Board id={idBoard} />
      ))}
    </div>
  );
};

export default Boards;
