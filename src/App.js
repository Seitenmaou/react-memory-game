import './App.css';
import React from 'react';
import Card_single from './cards/Card_single';

const possibleCards = 6;

function App() {
  const [cards, setCards] = React.useState([]);
  const [turns, setTurns] = React.useState(0);

  const createCards = () => {
    const newCards = Array.from({ length: possibleCards }, (_, i) => [
      { visual: i, id: 0 },
      { visual: i, id: 0 }
    ]).flat();

    const shuffledCards = newCards.sort(() => Math.random() - 0.5).map((card, index) => ({
      ...card,
      id: index,
    }));

    setCards(shuffledCards.sort(() => Math.random() - 0.5));
    setTurns(0);
  }

  React.useEffect(() => {
    createCards();
  }, []);

  React.useEffect(() => {
    console.log("Cards: ", cards);
    console.log("Turns: ", turns);
  }, [cards]);

  return (
    <div className="App">
      <h1> Game </h1>
      <button onClick={createCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <div className='card' key={card.id}>
            <Card_single card={card}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
