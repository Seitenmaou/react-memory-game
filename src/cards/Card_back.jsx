import React from 'react';
import './CardModule.css';

const Card_back = ({onClick}) => {
  return <div className="card_back" onClick={onClick}></div>;
};

export default Card_back;