const seedData = {
  chapters: {
    1: {
      name: "Al-Falaq",
      verses: {
        1: {
          index: 1,
          text: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ قُلْ هُوَ اللَّهُ أَحَدٌ",
        },
        2: { index: 2, text: "اللَّهُ الصَّمَدُ" },
        3: { index: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ" },
        4: { index: 4, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ" },
      },
    },
    2: {
      verses: {
      name: "Al-Nas",
        1: {
          index: 5,
          text: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        },
        2: { index: 6, text: "مِن شَرِّ مَا خَلَقَ" },
        3: { index: 7, text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ" },
        4: { index: 8, text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ" },
        5: { index: 9, text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ" },
      },
    },
  },
};

export function getChapterVerses(chapter_number) {
  return seedData.chapters[chapter_number];
}

export function getChapters() {
  return seedData.chapters;
}
