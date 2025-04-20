import './App.css';
import {useState, useEffect} from 'react';
import Card_single from './cards/Card_single';
import ConfirmModal from './popUpWindow/ConfirmModal';

// Number of pairs of cards to be created
const possibleCards = 6;

// App component
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // Function to create and shuffle cards
  const createCards = () => {
    setFirstCard(null)
    setSecondCard(null)
    setMatchedPairs(0)
    setTurns(0);

    // Create pairs of cards
    const newCards = Array.from({ length: possibleCards }, (_, i) => [
      { visual: i, id: 0 },
      { visual: i, id: 0 }
    ]).flat();

    // Shuffle the cards and assign unique IDs
    const shuffledCards = newCards
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({...card, id: index, matched: false}));

      // Set the shuffled cards to state
    setCards(shuffledCards.sort(() => Math.random() - 0.5));
  }

  const handleChoice = (card) => {
    // if(card.id === firstCard?.id) return;
    firstCard ? setSecondCard(card) : setFirstCard(card)
  }

  const resetTurns = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false);
  }

  const resetGame = () => {
    const timer = setTimeout(() => createCards(), 1000);
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true)
      if (firstCard.visual === secondCard.visual) {
        const updated = cards.map(card =>
          card.visual === firstCard.visual
            ? { ...card, matched: true }
            : card
        );
        setCards(updated);
        setMatchedPairs(prev => prev + 1)
        console.log(matchedPairs)
        resetTurns()
      }

      else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    if (matchedPairs === possibleCards) {
      const timer = setTimeout(() => setShowModal(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [matchedPairs]);

  // debug here
  console.log(cards)

  // start game
  useEffect(() => {
    createCards();
  }, []);

  return (
    <div className="App">
      <h1> Game </h1>
      <button onClick={() => setShowModal(true)}>New Game</button>
      <p> Turn: {turns} </p>
      

      <div className='card-grid'>
        {cards.map(card => (
          <div className='cards' key={card.id}>
            <Card_single 
              card={card}
              handleChoice={() => handleChoice(card)}
              isFlipped={card === firstCard || card === secondCard || card.matched}
              disabled={disabled}
            />
          </div>
        ))}
      </div>

      <div>
        <ConfirmModal
          open={showModal}
          message = {matchedPairs === possibleCards ? "Congratulation! Do you want to start a new game?" : "Start a new game?" }
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            resetGame();
            setShowModal(false);
          }}
        />
      </div>
    </div>
  );
}

export default App;
