import React from 'react';
import './CardModule.css';

const CardFront = ({id, value}) => {
  return <div className="card_front">{value}</div>;
};

export default CardFront;
