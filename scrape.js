// Note: add the selenium driver as a dev dependency (not a dependency)
// example taken from: https://www.selenium.dev/selenium/docs/api/javascript/index.html
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("/usr/local/bin/chromedriver");
// const os = require("os");
const fs = require("fs");

let options = new chrome.Options();

/**
 * http://www.alquran.eu/ organizes root words alphabetically, where each page
 * contains all of the roots that start with a specific letter.
 *
 * Our method of scraping this sight:
 * 1. Go to the page containing roots starting with the first letter.
 * 2. Find and store the first root word.
 * 3. Find and store the meaning for that root word.
 * 4. Find the next root word and repeat the process until all root word meanings in the page are found.
 * 5. Go to the next page containing the next letter, repeat from step 2 until all letters are scraped.
 *
 *
 */

options.headless();

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
        // console.log(table);
        let rows = await table[0].findElements(By.css("tr"));
        let roots = {};
        let new_roots;
        for (var row = 0; row < rows.length; row++) {
            table = await driver.findElements(By.id("roots_table"));
            // console.log(table);
            rows = await table[0].findElements(By.css("tr"));
            let letters = await rows[row].findElements(By.css("td"));
            for (var letter = 0; letter < letters.length; letter++) {
                table = await driver.findElements(By.id("roots_table"));
                // console.log(table);
                rows = await table[0].findElements(By.css("tr"));
                letters = await rows[row].findElements(By.css("td"));
                // console.log(letters[letter]);
                await letters[letter].click();
                new_roots = await scrape_page(driver);
                roots = { ...roots, ...new_roots };
            }
        }
        console.log(roots);
        let data = JSON.stringify(roots);
        fs.writeFileSync("root_meanings.json", data);
    } finally {
        console.log("quitting");
        setTimeout(() => {
            driver.quit();
        }, 10000);
    }
}

/**
 * We want to scrape all of the meanings for all of the root words for that start with a specific letter.
 *
 * All roots are stored in the <td class="rootname" ...>.
 * we want to find the next <td class="rootExpl" ...> which will contain inside of it the
 * english explanation represented by <div id="rootEn" ...>
 */
async function scrape_page(driver) {
    // Assume we have already navigated to the correct page.
    // console.log("Starting script");
    // var driver = await new Builder()
    //     .forBrowser("chrome")
    //     .setChromeOptions(options)
    //     .build();
    // let browser = new chrome.Driver(options);
    console.log("On a new page");
    // let predriver = await new Builder().forBrowser("chrome");
    // console.log("Script has continued")
    // let driver = predriver.build();
    let page_roots = {};
    // try {
    // Find all of the rootnames in the page and store them into a list
    let rootElements = await driver.findElements(By.className("rootname"));
    // let menuElements = await driver.findElements(By.className("rootMenu"));
    let englishMeanings = await driver.findElements(By.id("rootEn"));
    // let root = await rootElements[111].findElements(By.xpath(".//a"));
    // let root_word = await root[0].getText()
    // console.log(root_word, root_word.length);
    let root, word;
    for (var index = 0; index < rootElements.length; index++) {
        // Note: we can use the same index for the root word and the english meaning of that root word.
        // Becuase they should match in count.
        root = await rootElements[index].findElements(By.xpath(".//a"));
        // console.log(root);
        if (root) {
            word = formatWord(await root[0].getText()) + " ";
            // console.log(word);
            page_roots[word] = await englishMeanings[index].getAttribute(
                "innerText"
            );
        }
    }
    console.log(page_roots);
    // } finally {
    //     console.log("quitting");
    //     setTimeout(() => {
    //         driver.quit();
    //     }, 10000);
    // }
    return page_roots;
}

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

/**
 * Get the meanings of a root word from the menu section.
 */
// async function getMeanings(menuElements, index) {
//     // We will search for the english meanings element by xpath
//     let englishElement = await driver.findElements(
//         By.className(".//a[@title='english root explanation']")
//     );
//     let menuElements = await driver.findElements(By.className("rootEn"));
// }

//   NOTE: we should verify all of the data in our DB because it seems like it may be incorrect. We have 1799 root words when there should only be 17

go_through_letters();
