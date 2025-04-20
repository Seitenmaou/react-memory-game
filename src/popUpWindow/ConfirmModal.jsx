// src/components/ConfirmModal.jsx
import React from "react";
import "./ConfirmModal.css";

export default function ConfirmModal({ open, message, onConfirm, onCancel, leaderboard }) {
  if (!open) return null;       

  return (
    <div className="backdrop">
      <div className="pop-up-window">
        <p>{message}</p>

        <div className="actions">
          <button className="btn cancel" onClick={onCancel}>
            Cancel
          </button>

          <button className="btn leaderboard" onClick={leaderboard}>
            Leaderboard
          </button>

          <button className="btn confirm" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
