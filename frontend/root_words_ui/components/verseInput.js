import React from "react";
import styles from "../styles/Inputs.module.css";

export default function VerseInput(props) {
  let verses = [];
  for (var i = 1; i < props.verse_count + 1; i++) {
    verses.push(<option key={i} value={i}>Verse {i}</option>);
  }
  const setVerse = props.setVerse; // This is going to be the function that modifies the hook in the chapterInput component

  return (
    <select
      className={styles.verseInput}
      value={props.current_verse}
      onChange={(event) => {
        setVerse((verse) => {
          // I'm pretty sure this is set incorrectly
          verse = event.target.value;
        });
      }}
    >
      {verses}
    </select>
  );
}
