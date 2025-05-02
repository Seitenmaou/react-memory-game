import React, { useEffect, useMemo, useState } from "react";
import "./Leaderboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Leaderboard({ open, onClose }) {
  const [rows, setRows] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /* ---------- freeze random visuals once ---------- */
  const trophyStyles = useMemo(
    () =>
      [...Array(25)].map(() => {
        const size = 16 + Math.random() * 24;
        const angle = Math.random() * 360;
        const delay = Math.random() * 5;
        const duration = 8 + Math.random() * 4;
        return {
          fontSize: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
          "--angle": `${angle}deg`,
        };
      }),
    []
  );

  const sparkleStyles = useMemo(
    () =>
      [...Array(40)].map(() => {
        const size = 2 + Math.random() * 4;
        const opacity = 0.3 + Math.random() * 0.5;
        return {
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100 + 100}%`,
          animationDuration: `${5 + Math.random() * 5}s`,
          animationDelay: `${Math.random() * 5}s`,
          opacity,
        };
      }),
    []
  );

  useEffect(() => {
    if (open) {
      setRows(JSON.parse(localStorage.getItem("highScores") || "[]"));
      setDropdownOpen(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="leader-backdrop">
      {/* sparkles */}
      <div className="floating-sparkles">
        {sparkleStyles.map((style, i) => (
          <div key={i} className="sparkle" style={style} />
        ))}
      </div>

      {/* trophies */}
      <div className="floating-trophies">
        {trophyStyles.map((style, i) => (
          <i key={i} className="fas fa-trophy" style={style} />
        ))}
      </div>

      {/* dropdown buttons */}
      <div className="dropdown-buttons">
        <button
          className="menu-button"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          ☰
        </button>

        {dropdownOpen && (
          <div className="button-list">
            <button
              onClick={() => {
                localStorage.removeItem("highScores");
                setRows([]);
                setDropdownOpen(false);
              }}
            >
              Clear Leaderboard
            </button>
            <button onClick={() => setDropdownOpen(false)}>More Game</button>
          </div>
        )}
      </div>

      {/* leaderboard card */}
      <div className="leader">
        <h2>Leaderboard</h2>
        {rows.length ? (
          <ol>
            <li style={{ fontWeight: "bold" }}>
              <span style={{ paddingLeft: 40, paddingBottom: 5 }}>PLAYER</span>
              <span>TURNS</span>
            </li>

            {rows.map((row, index) => {
              const badge = ["🏆", "", ""][index] || "";  // 🥈 for 2nd 🥉 for 3rd
              
              return (
                <li key={row.id}>
                  <span className="place">{badge}</span>
                  <span className="player">{row.name}</span>
                  <span className="score">{row.score}</span>
                </li>
              );
            })}
          </ol>
        ) : (
          <p>No scores yet</p>
        )}

        <button
          onClick={() => {
            setDropdownOpen(false);
            onClose();
          }}
        >
          Return
        </button>
      </div>
    </div>
  );
}
