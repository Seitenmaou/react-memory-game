import React from 'react';
import styles from './Card.module.css';

const Card_front = ({id}) => {
  return <div className={styles.card_front}>{id}</div>;
};

export default Card_front;
