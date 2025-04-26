import React from 'react';
import './CardModule.css';

const CardBack = ({onClick}) => {
  return <div className="card_back" onClick={onClick}></div>;
};

export default CardBack;