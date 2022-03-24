--- Some comments on the table below 
--- the quran_text table is defined in quran-simple.sql

CREATE TABLE IF NOT EXISTS RootWords (
    RootID INT NOT NULL,
    RootWord VARCHAR(225) NOT NULL,
    PRIMARY KEY (RootID)
);

CREATE TABLE IF NOT EXISTS ArabicWord (
    WordID INT NOT NULL,
    Word VARCHAR(255) NOT NULL,
    Transliteration VARCHAR(255) NOT NULL,
    RootID INT NOT NULL,
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
        REFERENCES quran_text("index")
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (WordID)
		REFERENCES ArabicWord(WordID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

