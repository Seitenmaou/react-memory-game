import React from 'react';
import './CardModule.css';

const Card_front = ({id, value}) => {
  return <div className="card_front">{value}</div>;
};

export default Card_front;
