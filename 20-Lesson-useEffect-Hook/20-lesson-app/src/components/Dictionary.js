import { useState, useEffect } from "react";

export default function Dictionary() {
  const [word, setWord] = useState('Help');

  useEffect(() => {
    console.log("State changed, new word: ", word);
  }) // limits whats state useEffect cares about --> dependency array
  // limita lo que le importa al estado useEffect --> matriz de dependencias

  return (
    <>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <h1>Let's take the definition of the word {word}</h1>
    </>
  );
}
