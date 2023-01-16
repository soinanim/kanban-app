import React, { FC } from 'react';

import IconsSVG from './icons.svg';

interface IconsProps {
  name: string;
  color: string;
  size: string;
  className: string;
}

const Icons: FC<IconsProps> = (props) => {
  return (
    <svg
      className={`icon icon-${props.name} ${props.className}`}
      fill={props.color}
      stroke={props.color}
      width={props.size}
      height={props.size}>
      <use xlinkHref={`${IconsSVG}#${props.name}`} />
    </svg>
  );
};

export default Icons;
