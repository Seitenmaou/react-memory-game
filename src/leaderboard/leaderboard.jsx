import {React, useState} from "react";
// import "./Leaderboard.css";

export default function Leaderboard({open, close, newScore}) {
if (!open) return null;

const saveScore = (name, score) => {
    if (!name) return;
    console.log ("Saving score:", name, score);
    const existingScore = JSON.parse(localStorage.getItem("highScores")) || [];

    const newScore = { name, score };
    existingScore.push(newScore);

    //top 5 score
    const sorted = existingScore.sort((a, b) => a.score - b.score).slice(0, 5);

    localStorage.setItem("highScores", JSON.stringify(sorted));
}

  return (
    <div>
        <h1>Leaderboard</h1>
        <div className="leaderboard">
            <table style={{color: "white"}}>
            <thead>
                <tr>
                <th>Name</th>
                <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {JSON.parse(localStorage.getItem("highScores") || "[]").map((score, index) => (
                <tr key={index}>
                    <td>{score.name}</td>
                    <td>{score.score}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className="save-score">
            <input type="text" placeholder="Your Name" id="name" />
            <button onClick={() => saveScore(document.getElementById("name").value, newScore)}>Save Score</button>
            <button onClick={() => {
                localStorage.removeItem("highScores");
                alert("Scores cleared!");
            }
            }>Clear Scores (DEBUG)</button>
            <button onClick={close}>Close</button>
            
        </div>
    </div>
  );
}
