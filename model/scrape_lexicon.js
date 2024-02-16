const cliProgress = require('cli-progress');

const fs = require("fs");
const { Builder, Options, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const scrapedDefinitions = {};
const rootWordsNotFound = [];

async function go_through_words() {
  const rawdata = fs.readFileSync("./root_meanings.json");
  const meanings = JSON.parse(rawdata);
  const words = Object.keys(meanings);
  const totalNumberOfWords = words.length;
  
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(totalNumberOfWords, 0);

  const options = new chrome.Options();
  options.addArguments('--headless=new')
  const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

  for (const rootWord of words) {
    const wordWithoutSpaces = rootWord.replace(/ +/g, "");
    const url = `http://arabiclexicon.hawramani.com/${wordWithoutSpaces}/?book=50`

    await driver.get(url);
    const definitions = await driver.findElements(By.className("definition"));

    if (definitions.length > 0) {
      scrapedDefinitions[rootWord] = await definitions[0].getText();
    } else {
      rootWordsNotFound.push(wordWithoutSpaces);
    }

    progressBar.increment();
  }

  progressBar.stop();
  let data = JSON.stringify(scrapedDefinitions);
  console.log(`${rootWordsNotFound.length} not found out of ${totalNumberOfWords}`);
  fs.writeFileSync("root_meanings_lexicon.json", data);
  fs.writeFileSync("root_meanings_lexicon_words_not_found.json", JSON.stringify(rootWordsNotFound));
}

// Wanted a list of definitions, difficult to do with the way the site is set up
async function parseDefinitionFailed(rootWord, definition) {
  scrapedDefinitions[rootWord] = [];
  
  const childElements = await definition.findElements(By.xpath("*"));

  let currentDefinition = '';

  // This is not working as the inner text are not returned by the above
  for (const element of childElements) {
    const tagName = await element.getAttribute("tagName");

    if (tagName == "H3") {
      continue;
    } else if (tagName == "SPAN") {
      if (currentDefinition.length !== 0) {
        scrapedDefinitions[rootWord].push(currentDefinition);
        currentDefinition = '';
      }
    }

    const innerText = await element.getText();
    currentDefinition = currentDefinition + innerText;
  };
}

go_through_words();