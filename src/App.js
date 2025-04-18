import './App.css';
import {useState, useEffect} from 'react';
import Card_single from './cards/Card_single';

const possibleCards = 6;

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);

  const createCards = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurns(0);

    const newCards = Array.from({ length: possibleCards }, (_, i) => [
      { visual: i, id: 0 },
      { visual: i, id: 0 }
    ]).flat();

    const shuffledCards = newCards
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({...card, id: index, matched: false}));

    setCards(shuffledCards.sort(() => Math.random() - 0.5));
    setTurns(0);
  }

  const handleChoice = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card)
  }

  const resetTurns = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurns(prevTurn => prevTurn + 1)
  }

  useEffect(() => {
    createCards();
  }, []);

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.visual === secondCard.visual) {
        const updated = cards.map(card =>
          card.visual === firstCard.visual
            ? { ...card, matched: true }
            : card
        );
        setCards(updated);
        resetTurns()
      }

      else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [firstCard, secondCard]);

  // debug here
  console.log(cards)

  return (
    <div className="App">
      <h1> Game </h1>
      <button onClick={createCards}>New Game</button>
      <p> Turn: {turns} </p>
      

      <div className='card-grid'>
        {cards.map(card => (
          <div className='cards' key={card.id}>
            <Card_single 
              card={card}
              handleChoice={() => handleChoice(card)}
              isFlipped={card === firstCard || card === secondCard || card.matched}
            />
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default App;
