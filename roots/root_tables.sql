--- Some comments on the table below 
--- The Unique ID is an id for each "word" and it's corresponding root letters inside of the Quran
--- The surah_aya_id should be the Foreign key which corresponds to Surah:Ayat Number inside of the notes (kind of like the ID inside the cleaned dataset)

CREATE TABLE IF NOT EXISTS QuranAyahs (
    AyahID INT NOT NULL,
    SurahNumber INT,
    AyahNumber INT,
    Text VARCHAR(225),
    PRIMARY KEY (AyahID)
);

CREATE TABLE IF NOT EXISTS RootWords (
    RootID INT NOT NULL,
    RootWord VARCHAR(225),
    PRIMARY KEY (RootID)
);

CREATE TABLE IF NOT EXISTS ArabicWord (
    WordID INT NOT NULL,
    Word VARCHAR(255), 
    RootID INT,
    PRIMARY KEY (WordID),
    FOREIGN KEY (RootID)
        REFERENCES RootWords(RootID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS TextToWord  (
    AyahID INT NOT NULL,
    WordID INT NOT NULL,
    PRIMARY KEY (AyahID, WordID),
    FOREIGN KEY (AyahID)
        REFERENCES QuranAyahs(AyahID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (WordID)
		REFERENCES ArabicWord(WordID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

