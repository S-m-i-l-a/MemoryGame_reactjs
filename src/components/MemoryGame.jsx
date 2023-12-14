import { useState, useRef } from "react";
import shuffle from "../shuffle";
import "../styles/MemoryGame.css";

const items = [1, 2, 3, 4, 5];
const allItems = shuffle([...items, ...items]);
const defaultState = { index: null, value: null };

export default function MemoryGame() {
  const [firstCard, setFirstCard] = useState(defaultState);
  const [secondCard, setSecondCard] = useState(defaultState);
  const [remainingCards, setRemainingCards] = useState(items);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const timer = useRef();

  const handleClick = (index, value) => {
    clearTimeout(timer.current);

    if (firstCard.index === index) {
      setFirstCard(defaultState);
      setMoves(moves + 1);
      return;
    }

    if (firstCard.index === null || secondCard.index !== null) {
      setFirstCard({ index, value });
      setSecondCard(defaultState);
      setMoves(moves + 1);
    } else {
      setSecondCard({ index, value });
      setMoves(moves + 1);

      if (firstCard.value === value) {
        setRemainingCards(remainingCards.filter((card) => card !== value));
      }
    }

    timer.current = setTimeout(() => {
      setFirstCard(defaultState);
      setSecondCard(defaultState);
    }, 1000);
  };

  const handlePlayAgain = () => {
    // Reset the game state
    setFirstCard(defaultState);
    setSecondCard(defaultState);
    setRemainingCards(items);
    setMoves(0);
    setGameOver(false);
  };

  // Check if all cards have been matched
  if (remainingCards.length === 0 && !gameOver) {
    setGameOver(true);
  }

  return (
    <>
      {remainingCards.length > 0 ? `Remaining cards: ` : "Victory!"}
      {remainingCards.map((card, index) => (
        <img
          key={index}
          alt={`cat ${index}`}
          src={`https://robohash.org/${card}?set=set4&&size=80x80`}
        />
      ))}
      <div className="cardsContainer">
        {allItems.map((item, index) => (
          <div
            key={index}
            className={`card ${
              (firstCard.index === index ||
                secondCard.index === index ||
                !remainingCards.includes(item)) &&
              "flipped"
            }`}
            onClick={() => handleClick(index, item)}
          >
            <div className="backSide"></div>
            <img
              alt={`cat ${index}`}
              src={`https://robohash.org/${item}?set=set4&&size=120x120`}
            />
          </div>
        ))}
      </div>
      <div>
        <p>Moves used: {moves}</p>
        {gameOver && (
          <button onClick={handlePlayAgain}>Play Again</button>
        )}
      </div>
    </>
  );
}
