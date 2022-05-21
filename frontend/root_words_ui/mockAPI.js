const seedData = {
  chapters: {
    1: {
      name: "Al-Falaq",
      verses: {
        1: {
          id: 1,
          text: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ قُلْ هُوَ اللَّهُ أَحَدٌ",
        },
        2: { id: 2, text: "اللَّهُ الصَّمَدُ"},
        3: { id: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ" },
        4: { id: 4, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ" },
      },
    },
    2: {
      name: "Al-Nas",
      verses: {
        1: {
          id: 5,
          text: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        },
        2: { id: 6, text: "مِن شَرِّ مَا خَلَقَ" },
        3: { id: 7, text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ" },
        4: { id: 8, text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ" },
        5: { id: 9, text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ" },
      },
    },
    3: {
      name: "Al-Ikhlas",
      verses: {
        1: {
          id: 5,
          text: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        },
        2: { id: 6, text: "مِن شَرِّ مَا خَلَقَ" },
        3: { id: 7, text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ" },
        4: { id: 8, text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ" },
        5: { id: 9, text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ" },
      },
    },
  },
  root_words: {
    أَحَدٌ: "احد",
    الرَّحْمَـٰنِ: "رحم",
    الرَّحِيمِ: "رحم",
    غَاسِقٍ: "غسق"},
};

export function getChapter(chapter_number){
  return seedData.chapters[chapter_number];
}

export function getNumberofVerses(chapter_number) {
  return Object.keys(seedData.chapters[chapter_number].verses).length 
}

export function getChapterVerses(chapter_number) {
  return seedData.chapters[chapter_number];  
}

export function getVerse(chapter_number, verse_number) {
  return seedData.chapters[chapter_number].verses[verse_number].text;
}

// roots is an Object (key, value) 
export function getRootWords(chapter_number, verse_number) {
  let words = seedData.chapters[chapter_number].verses[verse_number].words;
  let roots = {};
  words.forEach((word) => {
    if (seedData.root_words[word]) {
      roots[word] = seedData.root_words[word];
    }
  });
  return roots;
}


export function getChapters() {
  return seedData.chapters;
}

for (const c_position in seedData.chapters) {
  let chapter = seedData.chapters[c_position];
  for (const v_position in chapter.verses) {
    let verse = chapter.verses[v_position];
    if (verse.text) {
      verse.words = verse.text.split(" ");
    }
  }
}
