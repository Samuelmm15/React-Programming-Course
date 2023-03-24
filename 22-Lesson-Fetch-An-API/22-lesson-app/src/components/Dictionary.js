import { useState, useEffect } from "react";

export default function Dictionary() {
  const [word, setWord] = useState('');
  const [word2, setWord2] = useState('');

  useEffect(() => {
    console.log("State changed, new word: " + word);
  }, [word]);

  useEffect(() => {
    console.log("State changed, new word: " + word2);
  }, [word2]);

  // no dependency array --> update for any state change
  // empty dependency array --> execute once
  // passing on data --> only execute when those state variables are changed

  return (
    <>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <h2>Let's take the definition of the word {word}</h2>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord2(e.target.value)}
      />
      <h2>Let's take the definition of the word {word}</h2>
    </>
  );
}
