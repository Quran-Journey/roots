// NOTICE: this script relies on a selenium web driver, without which it will not work.
// Note: we've add the selenium driver as a dev dependency (not a project dependency)
// This is because the purpose of this script is not to run in production, but rather
// for pre processing purposes (scraping data from the web).
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("/usr/local/bin/chromedriver");
const fs = require("fs");

let options = new chrome.Options();
options.headless();
/**
 * http://www.alquran.eu/ organizes root words alphabetically, where each page
 * contains all of the roots that start with a specific letter.
 *
 * Our method of scraping this sight:
 * 1. Go to the page containing roots starting with the first letter.
 * 2. Find and store the first root word.
 * 3. Find and store the meaning for that root word.
 * 4. Find the next root word and repeat the process until all root word meanings in the page are found.
 * 5. Go to the next page containing the next letter, repeat from step 2 until all root word meanings are scraped.
 *
 */

async function go_through_letters() {
    var driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    try {
        await driver.get(
            "http://www.alquran.eu/index.php?searchOption=roots&trans=Quran&selectedSuras=1,&searchText=%D8%A7&srchT=Quran"
        );
        let table = await driver.findElements(By.id("roots_table"));
        let rows = await table[0].findElements(By.css("tr"));
        let roots = {};
        let new_roots, letters;
        for (var row = 0; row < rows.length; row++) {
            letters = await refreshLetters(driver, rows, row);
            for (var letter = 0; letter < letters.length; letter++) {
                letters = await refreshLetters(driver, rows, row);
                await letters[letter].click();
                new_roots = await scrape_page(driver);
                roots = { ...roots, ...new_roots };
            }
        }
        let data = JSON.stringify(roots);
        fs.writeFileSync("root_meanings.json", data);
    } finally {
        console.log("quitting");
        setTimeout(() => {
            driver.quit();
        }, 10000);
    }
}

async function refreshLetters(driver, rows, row) {
    table = await driver.findElements(By.id("roots_table"));
    rows = await table[0].findElements(By.css("tr"));
    letters = await rows[row].findElements(By.css("td"));
    return letters;
}

/**
 * We want to scrape all of the meanings for all of the root words for that start with a specific letter.
 */
async function scrape_page(driver) {
    console.log("Scraping a new page");
    let page_roots = {};
    let rootElements = await driver.findElements(By.className("rootname"));
    let englishMeanings = await driver.findElements(By.id("rootEn"));
    let root, word;
    for (var index = 0; index < rootElements.length; index++) {
        root = await rootElements[index].findElements(By.xpath(".//a"));
        if (root) {
            word = formatWord(await root[0].getText());
            page_roots[word] = await englishMeanings[index].getAttribute(
                "innerText"
            );
            page_roots[word] = page_roots[word].replace(/(\r\n|\n|\r)/gm, ". ");
        }
    }
    console.log(`Scraped ${Object.keys(page_roots).length} word meanings`);
    return page_roots;
}

/**
 * Ensure that a root word is formatted the same way it is in the database.
 */
function formatWord(word) {
    let character;
    let new_word = "";
    for (var c = 0; c < word.length; c++) {
        character = word[c];
        if (character == "أ") {
            new_word += " " + "ا";
        } else {
            new_word += " " + character;
        }
    }
    return new_word.trim();
}

//   NOTE: we should verify all of the data in our DB because it seems like it may be incorrect. We have 1799 root words when there should only be 17

go_through_letters();
