import React, {useState} from "react";
import "./Leaderboard.css";

export default function SaveScoreModal({ open, message, onConfirm, onCancel, askName = false, score}) {
  const [name, setName] = useState("");


  const saveScore = (name, score) => {
    if (!name) return;
    console.log ("Saving score:", name, score);
    const existingScore = JSON.parse(localStorage.getItem("highScores")) || [];

    const newScore = { id: crypto.randomUUID(), name, score };
    existingScore.push(newScore);

    //top 7 score
    const sorted = existingScore.sort((a, b) => a.score - b.score).slice(0, 7);
    localStorage.setItem("highScores", JSON.stringify(sorted));
    }


    const handleConfirm = () => {
      if (askName) {
        saveScore(name.trim() || "Anonymous", score);
        setName("");                     
      }
      onConfirm(); 
    };


  if (!open) return null;   

  return (
    <div className="backdrop">
      <div className="pop-up-window">
      <p>{askName ? `You won in ${score} turns!` : message}</p>

      {askName && (
        <input
          autoFocus
          placeholder="Your name"
          value={name}
          maxLength="20"
          onChange={e => setName(e.target.value)}
        />
        )}

        <div className="actions">
        <button 
            className="btn confirm" 
            disabled = {askName && !name.trim()}
            onClick = {handleConfirm}
            >
            {askName ? "Save & New Game" : "Yes"}
          </button>

          <button className="btn cancel" onClick={onCancel}>
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
}