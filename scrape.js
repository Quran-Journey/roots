// Note: add the selenium driver as a dev dependency (not a dependency)
// example taken from: https://www.selenium.dev/selenium/docs/api/javascript/index.html
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("/usr/local/bin/chromedriver");
// const os = require("os");

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

/**
 * We want to scrape all of the meanings for all of the root words for that start with a specific letter.
 *
 * All roots are stored in the <td class="rootname" ...>.
 * we want to find the next <td class="rootExpl" ...> which will contain inside of it the
 * english explanation represented by <div id="rootEn" ...>
 */
async function scrape_page() {
    // Assume we have already navigated to the correct page.
    console.log("Starting script");
    var driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    // let browser = new chrome.Driver(options);
    console.log("Script has started");
    // let predriver = await new Builder().forBrowser("chrome");
    // console.log("Script has continued")
    // let driver = predriver.build();
    let page_roots = {};
    try {
        await driver.get(
            "http://www.alquran.eu/index.php?searchOption=roots&trans=Quran&selectedSuras=1,&searchText=%D8%A7&srchT=Quran"
        );
        // Find all of the rootnames in the page and store them into a list
        let rootElements = await driver.findElements(By.className("rootname"));
        // let menuElements = await driver.findElements(By.className("rootMenu"));
        let englishMeanings = await driver.findElements(By.id("rootEn"));
        console.log("Falafel");
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
                word = await root[0].getText();
                // console.log(word);
                page_roots[word] = [];
                page_roots[word].push(await englishMeanings[index].getAttribute("innerText"));
            }
        }
        console.log([page_roots]);
    } finally {
        console.log("quitting");
        setTimeout(() => {
            driver.quit();
        }, 10000);
    }
}

// Maybe we don't need to click anything

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

scrape_page();
