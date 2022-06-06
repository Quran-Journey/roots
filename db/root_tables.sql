--- Some comments on the table below 
--- the quran_text table is defined in quran-simple.sql

DROP TABLE IF EXISTS RootWord CASCADE;
CREATE TABLE IF NOT EXISTS RootWord (
    RootID INT PRIMARY KEY,
    RootWord VARCHAR(225) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS ArabicWord CASCADE;
CREATE TABLE IF NOT EXISTS ArabicWord (
    WordID INT PRIMARY KEY,
    Word VARCHAR(255) NOT NULL,
    RootID INT NOT NULL,
    FOREIGN KEY (RootID)
        REFERENCES RootWord(RootID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
DROP TABLE IF EXISTS TextToWord CASCADE;
CREATE TABLE IF NOT EXISTS TextToWord  (
    IndexID INT NOT NULL,
    WordID INT NOT NULL,
    PRIMARY KEY (IndexID, WordID),
    FOREIGN KEY (IndexID)
        REFERENCES quran_text("index")
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (WordID)
		REFERENCES ArabicWord(WordID)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);
DROP TABLE IF EXISTS RootMeaning CASCADE;
CREATE TABLE IF NOT EXISTS RootMeaning  (
    RootWord VARCHAR(225) PRIMARY KEY,
    Meanings TEXT,
    FOREIGN KEY (RootWord)
        REFERENCES RootWord(RootWord)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
