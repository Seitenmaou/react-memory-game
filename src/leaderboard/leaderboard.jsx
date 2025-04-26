import React, { useEffect, useState } from "react";
import "./Leaderboard.css";

export default function Leaderboard({ open, onClose }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (open) setRows(JSON.parse(localStorage.getItem("highScores") || "[]"));
  }, [open]);

  if (!open) return null;

  return (
    <div className="leader-backdrop">
      <div className="leader">
        <h2>Leaderboard</h2>
        {rows.length ? (
          <ol>
            {rows.map(row => (
              <li key={row.id}>
                <span>{row.name}</span>
                <span>{row.score}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p>No scores yet</p>
        )}
        <button onClick={onClose}>Return</button>
      </div>
    </div>
  );
}
