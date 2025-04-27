import './App.css';
import {useState, useEffect} from 'react';
import CardSingle from './cards/CardSingle';
import SaveScoreModal from './leaderboard/SaveScoreModal';
import Leaderboard from './leaderboard/leaderboard';


// Number of pairs of cards to be created
const possibleCards = 6;

// App component
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [skipAnim, setSkipAnim] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

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
    if(card.id === firstCard?.id) return;
    firstCard ? setSecondCard(card) : setFirstCard(card)
  }

  const resetTurns = () => {
    setFirstCard(null)
    setSecondCard(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false);
  }

  const resetGame = () => {
    setSkipAnim(true); 
    createCards();
    setTimeout(() => setSkipAnim(false), 0);
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.visual === secondCard.visual) {
        setCards(prevCards => {
          return prevCards.map(card =>
            card.visual === firstCard.visual
              ? { ...card, matched: true }
              : card
          );
        });
        setMatchedPairs(prev => prev + 1);
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [firstCard, secondCard]);
  

  useEffect(() => {
    if (matchedPairs === possibleCards) {
        const timer = setTimeout(() => setShowSave(true), 1500); 
        return () => clearTimeout(timer); 
      }
  }, [matchedPairs]);

  // start game
  useEffect(() => {
    createCards();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1> React Memory Game </h1>
        <button onClick={() => setShowModal(true)}>New Game</button>
        <button onClick={() => setShowLeaderboard(true)}>Leaderboard</button>
        <p> Turn: {turns} </p>
      </div>
      
      <div className='card-grid'>
        {cards.map(card => (
          <div className='cards' key={card.id}>
            <CardSingle 
              card={card}
              handleChoice={() => handleChoice(card)}
              isFlipped={card === firstCard || card === secondCard || card.matched}
              disabled={disabled}
              skipAnim={skipAnim}  
            />
          </div>
        ))}
      </div>

      <div>
        <SaveScoreModal
          open={showModal}
          message = {"Start a new game?" }
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            resetGame();
            setShowModal(false);
          }}
        />
      </div>

      <div>
        <SaveScoreModal
          open = {showSave}
          askName = {true}
          score={turns}
          onCancel={() => setShowSave(false)}  
          onConfirm={() => {
            resetGame();
            setTimeout(() => {
              setShowSave(false);
            }, 500);
          }}
        />
      </div>

      <div>
        <Leaderboard 
         open={showLeaderboard}
         onClose={() => setShowLeaderboard(false)}
         />
      </div>
    </div>
  );
}

export default App;
