import React, { useContext, useState } from "react";
import { FinalScoreContext } from "../contexts/FinalScoreContext";
import { GameOverContext } from "../contexts/GameoverContext";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const PlayerSubmit = () => {
  const { gameover,setGameOver } = useContext(GameOverContext);
  const { score } = useContext(FinalScoreContext);
  const [username, setUsername] = useState(""); // State to store the entered username
  const [isOpen, setIsOpen] = useState(true); // State to manage the visibility of the component
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const docRef = await addDoc(collection(db, "high scores"), {
          user: username,
          time: score,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    // Reset the input field after submission
    setUsername("");
    setGameOver(false);
    handleClose(); // remove the component
    navigate("/");
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleClose = () => {
    setIsOpen(false); // Set isOpen state to false to hide the component
  };

  if (!isOpen || !gameover) {
    return null;
  }

  return (
    <div className="submit-container">
    <h1 className="gameover-text">{score}</h1>
      <form className="player-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
          className="input-submit"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PlayerSubmit;