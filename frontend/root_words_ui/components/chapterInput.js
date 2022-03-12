import React, { useState } from "react";
import styles from "../styles/Inputs.module.css";
import VerseInput from "./verseInput";

/**
 * A component for the user to input the chapter and verse they would like the root words for.
 */
export default function ChapterInput() {
  // TODO: Fetch the actual chapter names and verse counts
  let chapters = {};
  let verse_count;
  let repr;

  for (var i = 1; i <= 114; i++) {
    // 114 chapters in the quran
    verse_count = 7; // TODO: replace this with actual verse count fetch
    repr = `Chapter ${i}`;
    let option = <option key={i} value={i}>{repr}</option>;
    chapters[`chapter_${i}`] = { option, verse_count, repr };
  }

  const [current_chapter, setChapter] = useState("chapter_1");
  const [current_verse, setVerse] = useState("verse_1");

  let chapter_options = Object.keys(chapters).map((c) => {
    return chapters[c].option;
  });

  return (
    <div className={styles.chapterVerseInput}>
      <select
        className={styles.ChapterInput}
        value={chapters[current_chapter].repr}
        onChange={(event) => {
          setChapter((chapter) => {
            // I'm pretty sure this is set incorrectly
            chapter = event.target.value;
          });
        }}
      >
        {chapter_options}
      </select>
      <VerseInput
        verse_count={chapters[current_chapter].verse_count}
        current_verse={current_verse}
        setVerse={setVerse}
      ></VerseInput>
      <button>&rarr;</button>
    </div>
  );
}
