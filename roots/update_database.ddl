--- Some comments on the table below 
--- The Unique ID is an id for each "word" and it's corresponding root letters inside of the Quran
--- The surah_aya_id should be the Foreign key which corresponds to Surah:Ayat Number inside of the notes (kind of like the ID inside the cleaned dataset)

DROP TABLE IF EXISTS `quran_text`;
CREATE TABLE `quran_text` (
  `index` int(4) NOT NULL auto_increment,
  `sura` int(3) NOT NULL default '0',
  `aya` int(3) NOT NULL default '0',
  `text` text NOT NULL,
  PRIMARY KEY  (`index`)
) ENGINE=MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


DROP TABLE IF EXISTS `root_letters`;
CREATE TABLE `root_letters` (
  `unique_id` int(10) NOT NULL auto_increment,
  `surah_aya_id` text NOT NULL, -- this should be a FK
  `arabic_word` text NOT Null, 
  `arabic_root_letters` text NOT NULL, 
  PRIMARY KEY  (`unique_id`)
) ENGINE=MyISAM DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS Root_Letters (
    UniqueID INT 
	DepartmentName VARCHAR(50) NOT NULL,
	HospitalName VARCHAR(255) NOT NULL,
	AnnualBudget INT,
	PRIMARY KEY (HospitalName, DepartmentName),
	FOREIGN KEY (HospitalName)
		REFERENCES Hospital(HospitalName)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);