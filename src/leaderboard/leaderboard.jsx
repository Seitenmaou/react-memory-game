import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Leaderboard({ open, onClose }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (open) setRows(JSON.parse(localStorage.getItem("highScores") || "[]"));
  }, [open]);

  if (!open) return null;

  return (
    <div className="leader-backdrop">
      {/* flying trophies... */}
      <div className="floating-trophies">
        {/* 25 trophies with random size, angle, timing */}
        {[...Array(25)].map((_, i) => { 
          // size 16 to 40px, angle 0 to 360, delay 0 to 5s, duration 8 to 12s
          const size = 16 + Math.random() * 24;
          const angle = Math.random() * 360;
          const delay = Math.random() * 5;
          const duration = 8 + Math.random() * 4;

          return (
            <i
              key={i}
              className="fas fa-trophy"
              style={{
                fontSize: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
                '--angle': `${angle}deg`
              }}
            />
          );
        })}
      </div>
      <div className="leader">
        <h2>Leaderboard</h2>
        {rows.length ? (
          <ol>
            <li style={{ fontWeight: "bold" }}>
            <span>PLAYER</span>
            <span>SCORE(TURNS)</span>
            </li>
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